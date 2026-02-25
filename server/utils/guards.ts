import type { H3Event } from 'h3'

interface AuthContext {
    userId: string
    role: string
    username: string
}

export function requireAuth(event: H3Event): AuthContext {
    const auth = event.context.auth as AuthContext | undefined

    if (!auth) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Anda harus login untuk mengakses resource ini',
        })
    }

    return auth
}

export function requireRole(event: H3Event, roles: string[]): AuthContext {
    const auth = requireAuth(event)

    if (!roles.includes(auth.role)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
            message: `Akses ditolak. Role yang diperlukan: ${roles.join(', ')}`,
        })
    }

    return auth
}
