import { AI_AUTHORS } from '../../utils/openai'

export default defineEventHandler(() => {
    return {
        authors: AI_AUTHORS.map((a: { id: string; name: string; focus: string; defaultTags: string[] }) => ({
            id: a.id,
            name: a.name,
            focus: a.focus,
            defaultTags: a.defaultTags,
        })),
    }
})
