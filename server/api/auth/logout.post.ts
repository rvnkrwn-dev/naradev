import { removeAuthCookie } from '../../utils/auth'

export default defineEventHandler((event) => {
    removeAuthCookie(event)

    return {
        success: true,
        message: 'Berhasil logout',
    }
})
