import { requireRole } from '../../../utils/guards'
import { getArticleBySlug, writeArticle } from '../../../utils/articles'
import { buildMultiLangContent } from '../../../utils/markdown'
import type { ArticleFrontmatter } from '../../../utils/markdown'

export default defineEventHandler(async (event) => {
    const auth = requireRole(event, ['admin', 'author'])
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'Slug diperlukan',
        })
    }

    // Get existing article
    const existing = await getArticleBySlug(slug)
    if (!existing) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not Found',
            message: 'Artikel tidak ditemukan',
        })
    }

    // Author can only edit own articles
    if (auth.role !== 'admin' && existing.authorId !== auth.userId) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
            message: 'Anda hanya bisa mengedit artikel Anda sendiri',
        })
    }

    const body = await readBody(event)

    // Validate titles if provided
    if (body.title_id && body.title_id.trim().length < 3) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Validation Error',
            message: 'Judul (ID) minimal 3 karakter',
        })
    }
    if (body.title_en && body.title_en.trim().length < 3) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Validation Error',
            message: 'Title (EN) must be at least 3 characters',
        })
    }

    const frontmatter: ArticleFrontmatter = {
        title_id: body.title_id?.trim() || existing.title_id,
        title_en: body.title_en?.trim() || existing.title_en,
        slug: slug,
        date: existing.date,
        description_id: body.description_id?.trim() ?? existing.description_id,
        description_en: body.description_en?.trim() ?? existing.description_en,
        tags: body.tags ?? existing.tags,
        status: body.status ?? existing.status,
        authorId: existing.authorId,
        cover: body.cover !== undefined ? (body.cover || undefined) : existing.cover,
    }

    const markdownId = body.markdown_id ?? existing.markdown_id
    const markdownEn = body.markdown_en ?? existing.markdown_en
    const markdownBody = buildMultiLangContent(markdownId, markdownEn)

    await writeArticle(slug, frontmatter, markdownBody)

    return {
        success: true,
        slug,
        message: 'Artikel berhasil diperbarui',
    }
})
