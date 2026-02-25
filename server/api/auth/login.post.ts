import { findUserByUsername, findUserByEmail, verifyPassword, toPublicUser } from '../../utils/users'
import { signToken, setAuthCookie } from '../../utils/auth'
import { validateLogin } from '../../utils/validation'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validate input
    const errors = validateLogin(body)
    if (errors.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Validation Error',
            data: { errors },
        })
    }

    // Find user by username or email
    let user = await findUserByUsername(body.username)
    if (!user) {
        user = await findUserByEmail(body.username)
    }

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Username/email atau password salah',
        })
    }

    // Verify password
    const isValid = await verifyPassword(body.password, user.passwordHash)
    if (!isValid) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Username/email atau password salah',
        })
    }

    // Issue JWT
    const token = signToken({
        sub: user.id,
        role: user.role,
        username: user.username,
    })

    setAuthCookie(event, token)

    return {
        success: true,
        user: toPublicUser(user),
    }
})
