import { readUsers, toPublicUser } from '../../utils/users'

export default defineEventHandler(async () => {
    const users = await readUsers()

    // Return public user info only (no passwords/emails)
    const authors = users.map(u => ({
        ...toPublicUser(u),
        createdAt: u.createdAt,
    }))

    return {
        success: true,
        authors,
    }
})
