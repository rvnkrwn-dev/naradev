import { requireAuth } from '../../utils/guards'
import { toggleReadingList } from '../../utils/readinglist'
import { articleExists } from '../../utils/articles'

export default defineEventHandler(async (event) => {
    const auth = requireAuth(event)
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

    const result = await toggleReadingList(auth.userId, slug)

    return {
        success: true,
        saved: result.saved,
        message: result.saved ? 'Artikel disimpan ke daftar baca' : 'Artikel dihapus dari daftar baca',
    }
})
