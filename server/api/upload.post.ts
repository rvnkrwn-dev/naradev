import { randomUUID } from 'node:crypto'
import { ghPutFile, ghRawUrl } from '../utils/github'

const UPLOADS_PATH = 'public/uploads/covers'
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

const MIME_TO_EXT: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/avif': '.avif',
}

export default defineEventHandler(async (event) => {
    // Read multipart form data
    const formData = await readMultipartFormData(event)

    if (!formData || formData.length === 0) {
        throw createError({ statusCode: 400, message: 'No file uploaded' })
    }

    const file = formData.find((f) => f.name === 'cover')
    if (!file || !file.data || !file.type) {
        throw createError({ statusCode: 400, message: 'No cover image found in form data' })
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
        throw createError({
            statusCode: 400,
            message: `File type "${file.type}" not allowed. Allowed: ${ALLOWED_TYPES.join(', ')}`,
        })
    }

    // Validate size
    if (file.data.length > MAX_SIZE) {
        throw createError({
            statusCode: 400,
            message: `File too large. Maximum size: ${MAX_SIZE / 1024 / 1024}MB`,
        })
    }

    // Generate unique filename
    const ext = MIME_TO_EXT[file.type] || '.jpg'
    const filename = `${randomUUID()}${ext}`
    const filePath = `${UPLOADS_PATH}/${filename}`

    // Upload to GitHub repo
    await ghPutFile(filePath, file.data, `Upload cover: ${filename}`)

    // Return the raw GitHub URL for the image
    const url = ghRawUrl(filePath)

    return { url, filename }
})
