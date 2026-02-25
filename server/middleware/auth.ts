import { getAuthToken, verifyToken } from '../utils/auth'

export default defineEventHandler((event) => {
    const token = getAuthToken(event)

    if (token) {
        const payload = verifyToken(token)
        if (payload) {
            event.context.auth = {
                userId: payload.sub,
                role: payload.role,
                username: payload.username,
            }
        }
    }
})
