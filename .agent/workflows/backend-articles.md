---
description: Implementasi backend CRUD artikel (public + protected)
---

# Backend Articles

## 1. Buat Article Utils
File: `server/utils/articles.ts`
- `getAllArticles()` — scan `/content/articles/*.md`, parse frontmatter
- `getArticleBySlug(slug)` — baca file, parse frontmatter + render markdown ke HTML
- `writeArticle(slug, frontmatter, body)` — atomic write file .md
- `deleteArticle(slug)` — hapus file .md
- `articlesIndexCache` — in-memory cache untuk listing
- `refreshArticlesCache()` — rebuild cache setelah CRUD

## 2. Buat Markdown Utils
File: `server/utils/markdown.ts`
- Parse frontmatter dengan `gray-matter`
- Render markdown ke HTML dengan `marked`
- Sanitize HTML output dengan `sanitize-html`

## 3. Implementasi Public Endpoints
- `server/api/articles/index.get.ts` — listing dengan pagination, filter tag, search
- `server/api/articles/[slug].get.ts` — detail artikel + rendered HTML

## 4. Implementasi Protected Endpoints (Admin)
- `server/api/admin/articles/index.post.ts` — create artikel baru
- `server/api/admin/articles/[slug].put.ts` — update artikel
- `server/api/admin/articles/[slug].delete.ts` — delete artikel

## 5. Pastikan Author Join
Setiap response artikel harus menyertakan `author: PublicUser` berdasarkan `authorId` dari frontmatter.

## 6. Testing
// turbo
```bash
# Create article (perlu auth cookie dari login)
curl -X POST http://localhost:3000/api/admin/articles \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Hello World","markdown":"# Hello\nIni artikel pertama","tags":["intro"],"description":"Artikel pertama","status":"published"}'

# List articles
curl http://localhost:3000/api/articles

# Get article detail
curl http://localhost:3000/api/articles/hello-world

# Update article
curl -X PUT http://localhost:3000/api/admin/articles/hello-world \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Hello World Updated","markdown":"# Hello Updated","tags":["intro","updated"]}'

# Delete article
curl -X DELETE http://localhost:3000/api/admin/articles/hello-world -b cookies.txt
```
