import { requireAuth } from '../../../utils/guards'
import { writeArticle } from '../../../utils/articles'
import {
    AI_AUTHORS,
    getAIAuthorById,
    getRandomAIAuthor,
    generateArticleContent,
    generateCoverImage,
} from '../../../utils/openai'
import type { ArticleFrontmatter } from '../../../utils/markdown'

const ALLOWED_USER_ID = 'usr_74107943' // rvnkrwn only

export default defineEventHandler(async (event) => {
    const auth = requireAuth(event)
    if (auth.userId !== ALLOWED_USER_ID) {
        throw createError({ statusCode: 403, message: 'Fitur ini hanya tersedia untuk admin.' })
    }

    const body = await readBody(event)
    const count = Math.min(Math.max(body?.count || 1, 1), 5)
    const customTopic = body?.topic || undefined
    const authorId = body?.authorId || undefined

    const results: { slug: string; title: string; author: string }[] = []
    const errors: string[] = []

    for (let i = 0; i < count; i++) {
        try {
            // Pick author
            const author = authorId
                ? getAIAuthorById(authorId) || getRandomAIAuthor()
                : getRandomAIAuthor()

            // Generate article content via GPT-4o mini
            const article = await generateArticleContent(author, customTopic)

            // Generate cover image
            let coverUrl = ''
            try {
                coverUrl = await generateCoverImage(article.slug, article.title_en, article.tags)
            } catch (err: any) {
                console.warn(`[generate] Cover image failed for ${article.slug}:`, err?.message)
            }

            // Build frontmatter
            const frontmatter: ArticleFrontmatter = {
                title_id: article.title_id,
                title_en: article.title_en,
                slug: article.slug,
                date: new Date().toISOString(),
                description_id: article.description_id,
                description_en: article.description_en,
                tags: article.tags,
                status: 'published',
                authorId: author.id,
                cover: coverUrl || undefined,
            }

            // Save article to GitHub
            await writeArticle(article.slug, frontmatter, article.body)

            results.push({
                slug: article.slug,
                title: article.title_en,
                author: author.name,
            })
        } catch (err: any) {
            console.error(`[generate] Error generating article ${i + 1}:`, err?.message || err)
            errors.push(err?.message || `Failed to generate article ${i + 1}`)
        }
    }

    return {
        success: results.length > 0,
        generated: results.length,
        articles: results,
        errors: errors.length > 0 ? errors : undefined,
    }
})
