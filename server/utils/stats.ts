import { ghGetFile, ghPutFile } from './github'

const STATS_PATH = 'data/stats.json'

export interface ArticleStats {
    views: number
    likes: number
    likedBy?: string[]
}

// In-memory cache + SHA tracking
let statsCache: Record<string, ArticleStats> | null = null
let statsSha: string | null = null

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

export async function readStats(): Promise<Record<string, ArticleStats>> {
    if (statsCache) return statsCache

    try {
        const file = await ghGetFile(STATS_PATH)
        if (!file) {
            const result = await ghPutFile(STATS_PATH, '{}', 'Initialize stats.json')
            statsSha = result.sha
            statsCache = {}
            return {}
        }
        statsSha = file.sha
        statsCache = JSON.parse(file.content)
        return statsCache!
    } catch {
        statsCache = {}
        return {}
    }
}

async function writeStats(stats: Record<string, ArticleStats>): Promise<void> {
    const content = JSON.stringify(stats, null, 2)
    if (!statsSha) {
        const file = await ghGetFile(STATS_PATH)
        statsSha = file?.sha ?? null
    }

    try {
        const result = await ghPutFile(
            STATS_PATH,
            content,
            `Update article stats`,
            statsSha || undefined
        )
        statsSha = result.sha
        statsCache = stats
    } catch (e) {
        console.error('Failed to write stats', e)
    }
}

export async function getArticleStats(slug: string): Promise<ArticleStats> {
    const stats = await readStats()
    return stats[slug] || { views: 0, likes: 0, likedBy: [] }
}

export async function incrementViews(slug: string): Promise<ArticleStats> {
    // Note: On production/Vercel this triggers a commit on GitHub per view.
    // We do it asynchronously without blocking where possible.
    await acquireLock()
    try {
        const stats = await readStats()
        if (!stats[slug]) stats[slug] = { views: 0, likes: 0, likedBy: [] }
        stats[slug].views += 1
        await writeStats(stats)
        return stats[slug]
    } finally {
        releaseLock()
    }
}

export async function toggleLike(slug: string, userId: string = 'anonymous'): Promise<ArticleStats> {
    await acquireLock()
    try {
        const stats = await readStats()
        if (!stats[slug]) stats[slug] = { views: 0, likes: 0, likedBy: [] }
        if (!stats[slug].likedBy) stats[slug].likedBy = []

        const index = stats[slug].likedBy!.indexOf(userId)

        if (index > -1) {
            // Un-like
            stats[slug].likes = Math.max(0, stats[slug].likes - 1)
            stats[slug].likedBy!.splice(index, 1)
        } else {
            // Like
            stats[slug].likes += 1
            stats[slug].likedBy!.push(userId)
        }

        await writeStats(stats)
        return stats[slug]
    } finally {
        releaseLock()
    }
}
