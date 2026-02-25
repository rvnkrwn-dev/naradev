---
description: Implementasi frontend pages dan komponen UI
---

# Frontend

## 1. Layout & Navbar
- `app/layouts/default.vue` — layout utama dengan Navbar
- `app/components/Navbar.vue` — navigation bar, conditional auth state
- `app/components/Footer.vue` — footer sederhana

## 2. Composables
- `app/composables/useAuth.ts` — state management auth (login, logout, register, user state)
- `app/composables/useArticles.ts` — fetch articles, search, filter

## 3. Komponen Reusable
- `app/components/ArticleCard.vue` — card preview artikel
- `app/components/AuthorBadge.vue` — badge info author
- `app/components/TagBadge.vue` — badge tag
- `app/components/ArticleForm.vue` — form create/edit markdown artikel

## 4. Halaman Publik
- `app/pages/index.vue` — home: hero section + latest articles
- `app/pages/articles/index.vue` — listing artikel + filter + search
- `app/pages/articles/[slug].vue` — detail artikel + author box

## 5. Halaman Auth
- `app/pages/login.vue` — form login
- `app/pages/register.vue` — form register

## 6. Halaman Dashboard (Protected)
- `app/pages/dashboard/index.vue` — list artikel milik user
- `app/pages/dashboard/create.vue` — form create artikel
- `app/pages/dashboard/edit/[slug].vue` — form edit artikel

## 7. Middleware Frontend
- `app/middleware/auth.ts` — redirect ke login jika belum auth
- `app/middleware/guest.ts` — redirect ke dashboard jika sudah auth

## 8. SEO
- `useHead()` dan `useSeoMeta()` di setiap halaman
- Meta title/description dari frontmatter artikel

## 9. Verifikasi Visual
Buka browser dan navigasi ke semua halaman:
1. `http://localhost:3000/` — hero + articles
2. `http://localhost:3000/articles` — listing
3. `http://localhost:3000/login` — form login
4. `http://localhost:3000/register` — form register
5. Register user baru, login, buat artikel, lihat hasilnya
