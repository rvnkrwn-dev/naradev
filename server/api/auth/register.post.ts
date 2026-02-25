import { findUserByUsername, findUserByEmail, createUser, toPublicUser, refreshPublicUserMapCache } from '../../utils/users'
import { signToken, setAuthCookie } from '../../utils/auth'
import { validateRegister } from '../../utils/validation'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validate input
    const errors = validateRegister(body)
    if (errors.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Validation Error',
            data: { errors },
        })
    }

    // Check unique username
    const existingUsername = await findUserByUsername(body.username)
    if (existingUsername) {
        throw createError({
            statusCode: 409,
            statusMessage: 'Conflict',
            message: 'Username sudah digunakan',
        })
    }

    // Check unique email
    const existingEmail = await findUserByEmail(body.email)
    if (existingEmail) {
        throw createError({
            statusCode: 409,
            statusMessage: 'Conflict',
            message: 'Email sudah digunakan',
        })
    }

    // Create user
    const user = await createUser({
        username: body.username.trim(),
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        password: body.password,
    })

    // Refresh cache
    refreshPublicUserMapCache()

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
