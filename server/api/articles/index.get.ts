import { getAllArticles } from '../../utils/articles'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const auth = event.context.auth as { userId: string; role: string } | undefined

    // Determine status filter
    let status: string = 'published'
    if (query.status === 'all' && auth) {
        // Only allow seeing all statuses if user is filtering their own articles or is admin
        if (auth.role === 'admin' || (query.authorId && query.authorId === auth.userId)) {
            status = 'all'
        }
    }

    const filters = {
        page: query.page ? Number(query.page) : 1,
        limit: query.limit ? Number(query.limit) : 10,
        tag: query.tag as string | undefined,
        q: query.q as string | undefined,
        status,
        authorId: query.authorId as string | undefined,
    }

    const result = await getAllArticles(filters)

    return {
        success: true,
        ...result,
    }
})
