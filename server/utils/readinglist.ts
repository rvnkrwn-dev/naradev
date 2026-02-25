import { ghGetFile, ghPutFile } from './github'

const READINGLIST_PATH = 'data/readinglist.json'

// In-memory cache + SHA tracking
let readinglistCache: Record<string, string[]> | null = null
let readinglistSha: string | null = null

// In-memory mutex for write locking
let writeLock = false
const lockQueue: (() => void)[] = []

async function acquireLock(): Promise<void> {
    if (!writeLock) {
        writeLock = true
        return
    }
    return new Promise((resolve) => {
        lockQueue.push(() => {
            writeLock = true
            resolve()
        })
    })
}

function releaseLock(): void {
    writeLock = false
    const next = lockQueue.shift()
    if (next) next()
}

export async function readReadingLists(): Promise<Record<string, string[]>> {
    if (readinglistCache) return readinglistCache

    try {
        const file = await ghGetFile(READINGLIST_PATH)
        if (!file) {
            const result = await ghPutFile(READINGLIST_PATH, '{}', 'Initialize readinglist.json')
            readinglistSha = result.sha
            readinglistCache = {}
            return {}
        }
        readinglistSha = file.sha
        readinglistCache = JSON.parse(file.content)
        return readinglistCache!
    } catch {
        readinglistCache = {}
        return {}
    }
}

async function writeReadingLists(data: Record<string, string[]>): Promise<void> {
    const content = JSON.stringify(data, null, 2)
    if (!readinglistSha) {
        const file = await ghGetFile(READINGLIST_PATH)
        readinglistSha = file?.sha ?? null
    }

    try {
        const result = await ghPutFile(
            READINGLIST_PATH,
            content,
            'Update reading list',
            readinglistSha || undefined
        )
        readinglistSha = result.sha
        readinglistCache = data
    } catch (e) {
        console.error('Failed to write reading list', e)
    }
}

export async function getUserReadingList(userId: string): Promise<string[]> {
    const data = await readReadingLists()
    return data[userId] || []
}

export async function toggleReadingList(userId: string, slug: string): Promise<{ saved: boolean; list: string[] }> {
    await acquireLock()
    try {
        const data = await readReadingLists()
        if (!data[userId]) data[userId] = []

        const index = data[userId].indexOf(slug)
        let saved: boolean

        if (index > -1) {
            // Remove from list
            data[userId].splice(index, 1)
            saved = false
        } else {
            // Add to list (prepend so newest saved is first)
            data[userId].unshift(slug)
            saved = true
        }

        await writeReadingLists(data)
        return { saved, list: data[userId] }
    } finally {
        releaseLock()
    }
}
