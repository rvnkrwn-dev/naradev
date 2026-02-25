import { findUserById, toPublicUser } from '../../utils/users'
import { getAllArticles } from '../../utils/articles'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({ statusCode: 400, message: 'Author ID is required' })
    }

    const user = await findUserById(id)
    if (!user) {
        throw createError({ statusCode: 404, message: 'Author not found' })
    }

    const { articles, total } = await getAllArticles({
        authorId: id,
        status: 'published',
        limit: 100,
        sort: 'latest',
    })

    return {
        success: true,
        author: {
            ...toPublicUser(user),
            createdAt: user.createdAt,
        },
        articles,
        totalArticles: total,
    }
})
