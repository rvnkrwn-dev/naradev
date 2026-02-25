import { incrementViews } from '../../../utils/stats'
import { articleExists } from '../../../utils/articles'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'Slug diperlukan',
        })
    }

    const exists = await articleExists(slug)
    if (!exists) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not Found',
            message: 'Artikel tidak ditemukan',
        })
    }

    const stats = await incrementViews(slug)
    return { success: true, stats }
})
