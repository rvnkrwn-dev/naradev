import { AI_AUTHORS } from '../../utils/openai'
import { requireAuth } from '../../utils/guards'

const ALLOWED_USER_ID = 'usr_74107943'

export default defineEventHandler((event) => {
    const auth = requireAuth(event)
    if (auth.userId !== ALLOWED_USER_ID) {
        throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    return {
        authors: AI_AUTHORS.map((a: { id: string; name: string; focus: string; defaultTags: string[] }) => ({
            id: a.id,
            name: a.name,
            focus: a.focus,
            defaultTags: a.defaultTags,
        })),
    }
})
