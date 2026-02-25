import { findUserById, toPublicUser } from '../../utils/users'
import { requireAuth } from '../../utils/guards'

export default defineEventHandler(async (event) => {
    const auth = requireAuth(event)

    const user = await findUserById(auth.userId)
    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not Found',
            message: 'User tidak ditemukan',
        })
    }

    return {
        success: true,
        user: toPublicUser(user),
    }
})
