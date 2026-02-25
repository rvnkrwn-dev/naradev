import { getArticleBySlug } from '../../utils/articles'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'Slug diperlukan',
        })
    }

    const article = await getArticleBySlug(slug)

    if (!article) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not Found',
            message: 'Artikel tidak ditemukan',
        })
    }

    // Only return published articles to public
    if (article.status !== 'published') {
        // Check if user is author or admin
        const auth = event.context.auth as { userId: string; role: string } | undefined
        if (!auth || (auth.role !== 'admin' && auth.userId !== article.authorId)) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
                message: 'Artikel tidak ditemukan',
            })
        }
    }

    return {
        success: true,
        article,
    }
})
