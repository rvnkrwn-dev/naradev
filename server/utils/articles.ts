import { parseArticleContent, renderMarkdown, buildArticleFile, splitMultiLangContent } from './markdown'
import { getPublicUserMap, type PublicUser } from './users'
import { ghGetFile, ghListFiles, ghPutFile, ghDeleteFile, ghGetSha } from './github'
import type { ArticleFrontmatter } from './markdown'

const ARTICLES_PATH = 'content/articles'

export interface ArticleIndex {
    title_id: string
    title_en: string
    slug: string
    date: string
    description_id: string
    description_en: string
    tags: string[]
    status: 'published' | 'draft'
    authorId: string
    cover?: string
    author: PublicUser | null
}

export interface ArticleDetail extends ArticleIndex {
    html_id: string
    html_en: string
    markdown_id: string
    markdown_en: string
}

// In-memory cache
let articlesIndexCache: ArticleIndex[] | null = null

export async function getAllArticles(filters?: {
    status?: string
    tag?: string
    q?: string
    page?: number
    limit?: number
    authorId?: string
}): Promise<{ articles: ArticleIndex[]; total: number; page: number; limit: number }> {
    let articles: ArticleIndex[]

    if (articlesIndexCache) {
        articles = [...articlesIndexCache]
    } else {
        articles = await buildArticlesIndex()
    }

    // Filter by status (default: published only)
    const statusFilter = filters?.status || 'published'
    if (statusFilter !== 'all') {
        articles = articles.filter((a) => a.status === statusFilter)
    }

    // Filter by authorId
    if (filters?.authorId) {
        articles = articles.filter((a) => a.authorId === filters.authorId)
    }

    // Filter by tag
    if (filters?.tag) {
        const tag = filters.tag.toLowerCase()
        articles = articles.filter((a) => a.tags.some((t) => t.toLowerCase() === tag))
    }

    // Search by title/description (both languages)
    if (filters?.q) {
        const q = filters.q.toLowerCase()
        articles = articles.filter(
            (a) =>
                a.title_id.toLowerCase().includes(q) ||
                a.title_en.toLowerCase().includes(q) ||
                a.description_id.toLowerCase().includes(q) ||
                a.description_en.toLowerCase().includes(q)
        )
    }

    // Sort by date descending
    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const total = articles.length
    const page = filters?.page || 1
    const limit = filters?.limit || 10
    const start = (page - 1) * limit
    const paged = articles.slice(start, start + limit)

    return { articles: paged, total, page, limit }
}

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
    const filePath = `${ARTICLES_PATH}/${slug}.md`

    try {
        const file = await ghGetFile(filePath)
        if (!file) return null

        const { frontmatter, content } = parseArticleContent(file.content)

        // Split multilang content
        const { id: markdownId, en: markdownEn } = splitMultiLangContent(content)
        const htmlId = renderMarkdown(markdownId)
        const htmlEn = renderMarkdown(markdownEn)

        // Get author
        const userMap = await getPublicUserMap()
        const author = frontmatter.authorId ? userMap.get(frontmatter.authorId) || null : null

        if (frontmatter.authorId && !author) {
            console.warn(`[articles] authorId "${frontmatter.authorId}" not found for article "${slug}"`)
        }

        // Support legacy single-language format (fallback)
        const titleId = frontmatter.title_id || (frontmatter as any).title || slug
        const titleEn = frontmatter.title_en || (frontmatter as any).title || slug
        const descId = frontmatter.description_id || (frontmatter as any).description || ''
        const descEn = frontmatter.description_en || (frontmatter as any).description || ''

        return {
            title_id: titleId,
            title_en: titleEn,
            slug: frontmatter.slug || slug,
            date: frontmatter.date || new Date().toISOString(),
            description_id: descId,
            description_en: descEn,
            tags: frontmatter.tags || [],
            status: frontmatter.status || 'draft',
            authorId: frontmatter.authorId || '',
            cover: frontmatter.cover || undefined,
            author,
            html_id: htmlId,
            html_en: htmlEn,
            markdown_id: markdownId,
            markdown_en: markdownEn,
        }
    } catch (err) {
        console.error(`[articles] Error reading article "${slug}":`, err)
        return null
    }
}

export async function writeArticle(
    slug: string,
    frontmatter: ArticleFrontmatter,
    markdownBody: string
): Promise<void> {
    const filePath = `${ARTICLES_PATH}/${slug}.md`
    const fileContent = buildArticleFile(frontmatter, markdownBody)

    // Check if file exists to get SHA for update
    const existingFile = await ghGetFile(filePath)
    const sha = existingFile?.sha

    await ghPutFile(
        filePath,
        fileContent,
        sha ? `Update article: ${slug}` : `Create article: ${slug}`,
        sha
    )

    // Refresh cache
    refreshArticlesCache()
}

export async function deleteArticle(slug: string): Promise<boolean> {
    const filePath = `${ARTICLES_PATH}/${slug}.md`
    const sha = await ghGetSha(filePath)
    if (!sha) return false

    await ghDeleteFile(filePath, sha, `Delete article: ${slug}`)
    refreshArticlesCache()
    return true
}

export async function articleExists(slug: string): Promise<boolean> {
    const filePath = `${ARTICLES_PATH}/${slug}.md`
    const result = await ghGetFile(filePath)
    return result !== null
}

async function buildArticlesIndex(): Promise<ArticleIndex[]> {
    const files = await ghListFiles(ARTICLES_PATH, '.md')
    const userMap = await getPublicUserMap()

    const articles: ArticleIndex[] = []

    for (const file of files) {
        try {
            const filePath = `${ARTICLES_PATH}/${file}`
            const ghFile = await ghGetFile(filePath)
            if (!ghFile) continue

            const { frontmatter } = parseArticleContent(ghFile.content)
            const slug = file.replace('.md', '')

            const author = frontmatter.authorId ? userMap.get(frontmatter.authorId) || null : null

            // Support legacy single-language format (fallback)
            const titleId = frontmatter.title_id || (frontmatter as any).title || slug
            const titleEn = frontmatter.title_en || (frontmatter as any).title || slug
            const descId = frontmatter.description_id || (frontmatter as any).description || ''
            const descEn = frontmatter.description_en || (frontmatter as any).description || ''

            articles.push({
                title_id: titleId,
                title_en: titleEn,
                slug: frontmatter.slug || slug,
                date: frontmatter.date || new Date().toISOString(),
                description_id: descId,
                description_en: descEn,
                tags: frontmatter.tags || [],
                status: frontmatter.status || 'draft',
                authorId: frontmatter.authorId || '',
                cover: frontmatter.cover || undefined,
                author,
            })
        } catch (err) {
            console.error(`[articles] Error parsing ${file}:`, err)
        }
    }

    articlesIndexCache = articles
    return articles
}

export function refreshArticlesCache(): void {
    articlesIndexCache = null
}
