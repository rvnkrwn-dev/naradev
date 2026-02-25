import { requireRole } from '../../../utils/guards'
import { getArticleBySlug, deleteArticle } from '../../../utils/articles'

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

    // Author can only delete own articles
    if (auth.role !== 'admin' && existing.authorId !== auth.userId) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
            message: 'Anda hanya bisa menghapus artikel Anda sendiri',
        })
    }

    await deleteArticle(slug)

    return {
        success: true,
        message: 'Artikel berhasil dihapus',
    }
})
