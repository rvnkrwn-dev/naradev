import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

interface TokenPayload {
    sub: string
    role: string
    username: string
}

export function signToken(payload: TokenPayload): string {
    const config = useRuntimeConfig()
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' })
}

export function verifyToken(token: string): TokenPayload | null {
    try {
        const config = useRuntimeConfig()
        return jwt.verify(token, config.jwtSecret) as TokenPayload
    } catch {
        return null
    }
}

export function setAuthCookie(event: H3Event, token: string) {
    const config = useRuntimeConfig()
    setCookie(event, config.cookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    })
}

export function removeAuthCookie(event: H3Event) {
    const config = useRuntimeConfig()
    deleteCookie(event, config.cookieName, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    })
}

export function getAuthToken(event: H3Event): string | null {
    const config = useRuntimeConfig()

    // 1. Cookie (primary)
    const cookieToken = getCookie(event, config.cookieName)
    if (cookieToken) return cookieToken

    // 2. Authorization header (fallback)
    const authHeader = getHeader(event, 'authorization')
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.slice(7)
    }

    return null
}
