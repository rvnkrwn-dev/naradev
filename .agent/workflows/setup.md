---
description: Setup proyek Nuxt 4 Web Artikel dari awal
---

# Setup Proyek

## 1. Inisialisasi Nuxt 4
// turbo
```bash
cd /Users/rvnkrwn/Developments/projects/revan/web-article
npx -y nuxi@latest init ./ --force
```

## 2. Install Dependencies
// turbo
```bash
npm install @nuxtjs/tailwindcss @tailwindcss/typography jsonwebtoken bcryptjs gray-matter marked sanitize-html uuid
npm install -D @types/jsonwebtoken @types/bcryptjs @types/sanitize-html
```

## 3. Konfigurasi Environment
Buat file `.env` di root proyek:
```
JWT_SECRET=your-super-secret-key-change-in-production
COOKIE_NAME=web_article_token
NODE_ENV=development
```

## 4. Konfigurasi TailwindCSS
Update `nuxt.config.ts` untuk menambahkan modul TailwindCSS dan typography plugin.

## 5. Buat Struktur Folder
// turbo
```bash
mkdir -p content/articles data/users server/api/auth server/api/articles server/api/admin/articles server/middleware server/utils app/pages/articles app/pages/dashboard app/components app/composables app/layouts
```

## 6. Buat File Data Awal
Buat `data/users.json` dengan array kosong `[]`.

## 7. Verifikasi
// turbo
```bash
npm run dev
```
Pastikan server berjalan tanpa error di `http://localhost:3000`.
