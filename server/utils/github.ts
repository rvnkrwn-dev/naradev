/**
 * GitHub Contents API client for persistent storage on Vercel.
 * 
 * Uses the GitHub REST API to read/write files in the repo,
 * effectively using the repository as a database/file storage.
 */

interface GitHubFileResponse {
    name: string
    path: string
    sha: string
    content: string // base64 encoded
    encoding: string
    type: 'file'
}

interface GitHubDirEntry {
    name: string
    path: string
    sha: string
    type: 'file' | 'dir'
}

interface GitHubConfig {
    token: string
    owner: string
    repo: string
    branch: string
}

function getConfig(): GitHubConfig {
    const config = useRuntimeConfig()
    return {
        token: config.githubToken as string,
        owner: config.githubOwner as string,
        repo: config.githubRepo as string,
        branch: (config.githubBranch as string) || 'main',
    }
}

function apiUrl(path: string): string {
    const { owner, repo } = getConfig()
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `https://api.github.com/repos/${owner}/${repo}/contents/${cleanPath}`
}

function headers(): Record<string, string> {
    const { token } = getConfig()
    return {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
    }
}

/**
 * Get a file's content and SHA from the repo.
 * Returns null if the file doesn't exist.
 */
export async function ghGetFile(path: string): Promise<{ content: string; sha: string } | null> {
    const { branch } = getConfig()
    try {
        const data = await $fetch<GitHubFileResponse>(apiUrl(path), {
            headers: headers(),
            query: { ref: branch },
        })
        // Decode base64 content
        const content = Buffer.from(data.content, 'base64').toString('utf-8')
        return { content, sha: data.sha }
    } catch (err: any) {
        if (err?.response?.status === 404 || err?.status === 404 || err?.statusCode === 404) {
            return null
        }
        console.error(`[github] Error fetching file "${path}":`, err?.message || err)
        throw err
    }
}

/**
 * List files in a directory. Optionally filter by extension.
 */
export async function ghListFiles(path: string, ext?: string): Promise<string[]> {
    const { branch } = getConfig()
    try {
        const data = await $fetch<GitHubDirEntry[]>(apiUrl(path), {
            headers: headers(),
            query: { ref: branch },
        })

        if (!Array.isArray(data)) return []

        let files = data.filter((e) => e.type === 'file').map((e) => e.name)
        if (ext) {
            files = files.filter((f) => f.endsWith(ext))
        }
        return files
    } catch (err: any) {
        if (err?.response?.status === 404 || err?.status === 404 || err?.statusCode === 404) {
            return []
        }
        console.error(`[github] Error listing files in "${path}":`, err?.message || err)
        throw err
    }
}

/**
 * Create or update a file in the repo.
 * If `sha` is provided, it's an update (required for existing files).
 * Content can be a string (will be base64-encoded) or a Buffer.
 */
export async function ghPutFile(
    path: string,
    content: string | Buffer,
    message: string,
    sha?: string
): Promise<{ sha: string }> {
    const { branch } = getConfig()
    const base64Content = Buffer.isBuffer(content)
        ? content.toString('base64')
        : Buffer.from(content, 'utf-8').toString('base64')

    const body: Record<string, any> = {
        message,
        content: base64Content,
        branch,
    }
    if (sha) {
        body.sha = sha
    }

    const data = await $fetch<{ content: { sha: string } }>(apiUrl(path), {
        method: 'PUT',
        headers: headers(),
        body,
    })

    return { sha: data.content.sha }
}

/**
 * Delete a file from the repo.
 * Requires the current SHA of the file.
 */
export async function ghDeleteFile(path: string, sha: string, message: string): Promise<void> {
    const { branch } = getConfig()
    await $fetch(apiUrl(path), {
        method: 'DELETE',
        headers: headers(),
        body: {
            message,
            sha,
            branch,
        },
    })
}

/**
 * Get the raw content URL for a file in the repo.
 * Useful for serving images directly.
 */
export function ghRawUrl(path: string): string {
    const { owner, repo, branch } = getConfig()
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${cleanPath}`
}

/**
 * Check if a file exists in the repo.
 */
export async function ghFileExists(path: string): Promise<boolean> {
    const result = await ghGetFile(path)
    return result !== null
}

/**
 * Get a file's SHA only (for delete/update operations).
 */
export async function ghGetSha(path: string): Promise<string | null> {
    const result = await ghGetFile(path)
    return result?.sha || null
}
