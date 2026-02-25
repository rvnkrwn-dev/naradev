import matter from 'gray-matter'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

export interface ArticleFrontmatter {
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
}

export interface ArticleRaw {
    frontmatter: ArticleFrontmatter
    content: string
    filePath: string
}

export function parseArticleContent(raw: string): { frontmatter: Record<string, any>; content: string } {
    const { data, content } = matter(raw)
    return { frontmatter: data, content }
}

/**
 * Split multilang markdown content by `<!-- lang:xx -->` markers.
 * Returns { id: string, en: string }
 */
export function splitMultiLangContent(content: string): { id: string; en: string } {
    const langIdMatch = content.indexOf('<!-- lang:id -->')
    const langEnMatch = content.indexOf('<!-- lang:en -->')

    // No markers found — treat entire content as both languages (legacy format)
    if (langIdMatch === -1 && langEnMatch === -1) {
        return { id: content.trim(), en: content.trim() }
    }

    let idContent = ''
    let enContent = ''

    if (langIdMatch !== -1 && langEnMatch !== -1) {
        if (langIdMatch < langEnMatch) {
            idContent = content.substring(langIdMatch + '<!-- lang:id -->'.length, langEnMatch).trim()
            enContent = content.substring(langEnMatch + '<!-- lang:en -->'.length).trim()
        } else {
            enContent = content.substring(langEnMatch + '<!-- lang:en -->'.length, langIdMatch).trim()
            idContent = content.substring(langIdMatch + '<!-- lang:id -->'.length).trim()
        }
    } else if (langIdMatch !== -1) {
        idContent = content.substring(langIdMatch + '<!-- lang:id -->'.length).trim()
    } else if (langEnMatch !== -1) {
        enContent = content.substring(langEnMatch + '<!-- lang:en -->'.length).trim()
    }

    return { id: idContent, en: enContent }
}

/**
 * Build multilang markdown body with `<!-- lang:xx -->` markers
 */
export function buildMultiLangContent(idBody: string, enBody: string): string {
    return `<!-- lang:id -->\n${idBody}\n\n<!-- lang:en -->\n${enBody}`
}

export function renderMarkdown(content: string): string {
    const rawHtml = marked.parse(content, { async: false }) as string

    // Sanitize HTML to prevent XSS
    return sanitizeHtml(rawHtml, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'details', 'summary', 'mark', 'del', 'ins',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'pre', 'code', 'span',
        ]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
            a: ['href', 'title', 'target', 'rel'],
            code: ['class'],
            span: ['class'],
            pre: ['class'],
            td: ['align'],
            th: ['align'],
        },
        allowedClasses: {
            code: ['language-*', 'hljs*'],
            pre: ['language-*'],
            span: ['hljs*'],
        },
    })
}

export function buildFrontmatterString(frontmatter: ArticleFrontmatter): string {
    const lines = [
        '---',
        `title_id: "${frontmatter.title_id.replace(/"/g, '\\"')}"`,
        `title_en: "${frontmatter.title_en.replace(/"/g, '\\"')}"`,
        `slug: "${frontmatter.slug}"`,
        `date: "${frontmatter.date}"`,
        `description_id: "${frontmatter.description_id.replace(/"/g, '\\"')}"`,
        `description_en: "${frontmatter.description_en.replace(/"/g, '\\"')}"`,
        `tags: [${frontmatter.tags.map((t) => `"${t}"`).join(', ')}]`,
        `status: "${frontmatter.status}"`,
        `authorId: "${frontmatter.authorId}"`,
    ]
    if (frontmatter.cover) {
        lines.push(`cover: "${frontmatter.cover}"`)
    }
    lines.push('---')
    return lines.join('\n')
}

export function buildArticleFile(frontmatter: ArticleFrontmatter, markdownBody: string): string {
    return `${buildFrontmatterString(frontmatter)}\n\n${markdownBody}`
}
