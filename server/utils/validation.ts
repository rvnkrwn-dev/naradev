export interface ValidationError {
    field: string
    message: string
}

export function validateRegister(body: any): ValidationError[] {
    const errors: ValidationError[] = []

    if (!body.username || typeof body.username !== 'string' || body.username.trim().length < 3) {
        errors.push({ field: 'username', message: 'Username minimal 3 karakter' })
    } else if (!/^[a-zA-Z0-9_]+$/.test(body.username)) {
        errors.push({ field: 'username', message: 'Username hanya boleh huruf, angka, dan underscore' })
    }

    if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Nama minimal 2 karakter' })
    }

    if (!body.email || typeof body.email !== 'string') {
        errors.push({ field: 'email', message: 'Email wajib diisi' })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
        errors.push({ field: 'email', message: 'Format email tidak valid' })
    }

    if (!body.password || typeof body.password !== 'string' || body.password.length < 6) {
        errors.push({ field: 'password', message: 'Password minimal 6 karakter' })
    }

    return errors
}

export function validateLogin(body: any): ValidationError[] {
    const errors: ValidationError[] = []

    if (!body.username || typeof body.username !== 'string') {
        errors.push({ field: 'username', message: 'Username atau email wajib diisi' })
    }

    if (!body.password || typeof body.password !== 'string') {
        errors.push({ field: 'password', message: 'Password wajib diisi' })
    }

    return errors
}

export function validateArticle(body: any): ValidationError[] {
    const errors: ValidationError[] = []

    // Validate title_id
    if (!body.title_id || typeof body.title_id !== 'string' || body.title_id.trim().length < 3) {
        errors.push({ field: 'title_id', message: 'Judul (ID) minimal 3 karakter' })
    } else if (body.title_id.length > 200) {
        errors.push({ field: 'title_id', message: 'Judul (ID) maksimal 200 karakter' })
    }

    // Validate title_en
    if (!body.title_en || typeof body.title_en !== 'string' || body.title_en.trim().length < 3) {
        errors.push({ field: 'title_en', message: 'Title (EN) must be at least 3 characters' })
    } else if (body.title_en.length > 200) {
        errors.push({ field: 'title_en', message: 'Title (EN) must be no more than 200 characters' })
    }

    // Validate markdown_id
    if (!body.markdown_id || typeof body.markdown_id !== 'string' || body.markdown_id.trim().length < 10) {
        errors.push({ field: 'markdown_id', message: 'Konten artikel (ID) minimal 10 karakter' })
    }

    // Validate markdown_en
    if (!body.markdown_en || typeof body.markdown_en !== 'string' || body.markdown_en.trim().length < 10) {
        errors.push({ field: 'markdown_en', message: 'Article content (EN) must be at least 10 characters' })
    }

    if (body.slug && typeof body.slug === 'string' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug)) {
        errors.push({ field: 'slug', message: 'Slug hanya boleh huruf kecil, angka, dan tanda hubung' })
    }

    if (body.tags && !Array.isArray(body.tags)) {
        errors.push({ field: 'tags', message: 'Tags harus berupa array' })
    }

    if (body.status && !['published', 'draft'].includes(body.status)) {
        errors.push({ field: 'status', message: 'Status harus "published" atau "draft"' })
    }

    return errors
}

export function sanitizeSlug(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

export function generateSlugFromTitle(title: string): string {
    return sanitizeSlug(title)
}
