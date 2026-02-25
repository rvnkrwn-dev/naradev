import { requireRole } from '../../../utils/guards'
import { writeArticle, articleExists } from '../../../utils/articles'
import { validateArticle, generateSlugFromTitle } from '../../../utils/validation'
import { buildMultiLangContent } from '../../../utils/markdown'
import type { ArticleFrontmatter } from '../../../utils/markdown'

export default defineEventHandler(async (event) => {
    const auth = requireRole(event, ['admin', 'author'])
    const body = await readBody(event)

    // Validate
    const errors = validateArticle(body)
    if (errors.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Validation Error',
            data: { errors },
        })
    }

    // Generate slug from ID title
    let slug = body.slug ? body.slug.trim() : generateSlugFromTitle(body.title_id)

    // Check slug uniqueness
    if (await articleExists(slug)) {
        // Append timestamp suffix
        slug = `${slug}-${Date.now()}`
    }

    const frontmatter: ArticleFrontmatter = {
        title_id: body.title_id.trim(),
        title_en: body.title_en.trim(),
        slug,
        date: new Date().toISOString(),
        description_id: body.description_id?.trim() || '',
        description_en: body.description_en?.trim() || '',
        tags: body.tags || [],
        status: body.status || 'draft',
        authorId: auth.userId,
        cover: body.cover || undefined,
    }

    const markdownBody = buildMultiLangContent(body.markdown_id, body.markdown_en)

    await writeArticle(slug, frontmatter, markdownBody)

    return {
        success: true,
        slug,
        message: 'Artikel berhasil dibuat',
    }
})
