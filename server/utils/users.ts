import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { ghGetFile, ghPutFile } from './github'

export interface User {
    id: string
    username: string
    name: string
    email: string
    role: 'admin' | 'author' | 'reader'
    passwordHash: string
    createdAt: string
    updatedAt: string
}

export interface PublicUser {
    id: string
    username: string
    name: string
    role: string
}

const USERS_PATH = 'data/users.json'

// In-memory cache + SHA tracking
let usersCache: User[] | null = null
let usersSha: string | null = null

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

export async function readUsers(): Promise<User[]> {
    if (usersCache) return usersCache

    try {
        const file = await ghGetFile(USERS_PATH)
        if (!file) {
            // File doesn't exist yet — create it with empty array
            const result = await ghPutFile(USERS_PATH, '[]', 'Initialize users.json')
            usersSha = result.sha
            usersCache = []
            return []
        }
        usersSha = file.sha
        usersCache = JSON.parse(file.content)
        return usersCache!
    } catch {
        usersCache = []
        return []
    }
}

async function writeUsers(users: User[]): Promise<void> {
    const content = JSON.stringify(users, null, 2)

    // If we don't have a SHA, fetch it
    if (!usersSha) {
        const file = await ghGetFile(USERS_PATH)
        usersSha = file?.sha ?? null
    }

    const result = await ghPutFile(
        USERS_PATH,
        content,
        `Update users (${users.length} users)`,
        usersSha || undefined
    )
    usersSha = result.sha
    usersCache = users
}

export async function findUserById(id: string): Promise<User | undefined> {
    const users = await readUsers()
    return users.find((u) => u.id === id)
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
    const users = await readUsers()
    return users.find((u) => u.username.toLowerCase() === username.toLowerCase())
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
    const users = await readUsers()
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export async function createUser(data: {
    username: string
    name: string
    email: string
    password: string
    role?: 'admin' | 'author' | 'reader'
}): Promise<User> {
    await acquireLock()
    try {
        const users = await readUsers()
        const now = new Date().toISOString()
        const passwordHash = await bcrypt.hash(data.password, 12)

        const user: User = {
            id: `usr_${uuidv4().split('-')[0]}`,
            username: data.username,
            name: data.name,
            email: data.email,
            role: data.role || 'author',
            passwordHash,
            createdAt: now,
            updatedAt: now,
        }

        users.push(user)
        await writeUsers(users)
        return user
    } finally {
        releaseLock()
    }
}

export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash)
}

export function toPublicUser(user: User): PublicUser {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
    }
}

// Cache helpers
export function refreshUsersCache(): void {
    usersCache = null
    usersSha = null
}

// Public user map cache
let publicUserMapCache: Map<string, PublicUser> | null = null

export async function getPublicUserMap(): Promise<Map<string, PublicUser>> {
    if (publicUserMapCache) return publicUserMapCache

    const users = await readUsers()
    const map = new Map<string, PublicUser>()
    for (const user of users) {
        map.set(user.id, toPublicUser(user))
    }
    publicUserMapCache = map
    return map
}

export function refreshPublicUserMapCache(): void {
    publicUserMapCache = null
}
