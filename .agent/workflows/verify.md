---
description: Verifikasi dan testing keseluruhan aplikasi
---

# Verifikasi

## 1. Build Check
// turbo
```bash
cd /Users/rvnkrwn/Developments/projects/revan/web-article
npm run build
```

## 2. Test Auth Flow
1. Register user baru via API
2. Login dan dapatkan cookie
3. Akses `/api/auth/me` — harus return PublicUser
4. Logout — cookie harus dihapus
5. Akses `/api/auth/me` lagi — harus 401

## 3. Test Article CRUD
1. Login sebagai author
2. Create artikel via POST `/api/admin/articles`
3. Verifikasi file `.md` terbuat di `/content/articles/`
4. GET `/api/articles` — artikel harus muncul di listing
5. GET `/api/articles/:slug` — detail harus ada rendered HTML + author
6. PUT update artikel — verifikasi perubahan
7. DELETE artikel — verifikasi file terhapus

## 4. Test Security
1. Akses endpoint protected tanpa auth — harus 401
2. Author coba edit artikel orang lain — harus 403
3. Reader coba create artikel — harus 403
4. Cek response API — TIDAK BOLEH ada passwordHash atau email di response artikel

## 5. Test Frontend
Buka browser dan verifikasi:
1. Home page tampil dengan hero + artikel terbaru
2. Listing page bisa filter tag dan search
3. Detail page render markdown dengan prose styling
4. Login/Register flow berfungsi
5. Dashboard tampil artikel milik user
6. Create/Edit artikel berfungsi
7. Responsive di mobile view

## 6. SEO Check
1. View page source — pastikan ada meta title/description
2. Cek bahwa setiap halaman artikel punya meta unik
