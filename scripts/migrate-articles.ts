/**
 * Migration script: Convert existing single-language articles to multilingual format.
 * 
 * - Converts `title` → `title_id` + `title_en`
 * - Converts `description` → `description_id` + `description_en`  
 * - Wraps markdown body with `<!-- lang:id -->` and `<!-- lang:en -->` markers
 * 
 * Usage: npx tsx scripts/migrate-articles.ts
 */

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'

const ARTICLES_DIR = join(process.cwd(), 'content', 'articles')

async function migrate() {
    console.log('🔄 Starting article migration to multilingual format...\n')

    const files = await readdir(ARTICLES_DIR)
    const mdFiles = files.filter(f => f.endsWith('.md'))

    let migrated = 0
    let skipped = 0

    for (const file of mdFiles) {
        const filePath = join(ARTICLES_DIR, file)
        const raw = await readFile(filePath, 'utf-8')
        const { data: frontmatter, content } = matter(raw)

        // Skip if already migrated (has title_id)
        if (frontmatter.title_id) {
            console.log(`  ⏭️  ${file} — already migrated, skipping`)
            skipped++
            continue
        }

        // Migrate frontmatter
        const newFrontmatter: Record<string, any> = {}
        newFrontmatter.title_id = frontmatter.title || file.replace('.md', '')
        newFrontmatter.title_en = frontmatter.title || file.replace('.md', '')
        newFrontmatter.slug = frontmatter.slug || file.replace('.md', '')
        newFrontmatter.date = frontmatter.date || new Date().toISOString()
        newFrontmatter.description_id = frontmatter.description || ''
        newFrontmatter.description_en = frontmatter.description || ''
        newFrontmatter.tags = frontmatter.tags || []
        newFrontmatter.status = frontmatter.status || 'draft'
        newFrontmatter.authorId = frontmatter.authorId || ''
        if (frontmatter.cover) {
            newFrontmatter.cover = frontmatter.cover
        }

        // Wrap body with language markers
        const trimmedContent = content.trim()
        const newContent = `<!-- lang:id -->\n${trimmedContent}\n\n<!-- lang:en -->\n${trimmedContent}`

        // Build new file
        const newFile = matter.stringify(newContent, newFrontmatter)
        await writeFile(filePath, newFile, 'utf-8')

        console.log(`  ✅ ${file} — migrated successfully`)
        migrated++
    }

    console.log(`\n📊 Migration complete: ${migrated} migrated, ${skipped} skipped out of ${mdFiles.length} total.\n`)
}

migrate().catch(err => {
    console.error('❌ Migration failed:', err)
    process.exit(1)
})
