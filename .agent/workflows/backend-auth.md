---
description: Implementasi backend authentication (JWT, register, login, logout, me)
---

# Backend Auth

## 1. Buat Server Utils
File-file di `server/utils/`:
- `auth.ts` — JWT sign/verify, cookie helper
- `users.ts` — CRUD user file-based (read/write JSON, hash password)
- `validation.ts` — validasi input (email, username, password strength)

## 2. Buat Auth Middleware
File: `server/middleware/auth.ts`
- Baca token dari cookie httpOnly
- Verify JWT signature dan expiry
- Attach `event.context.auth = { userId, role }` jika valid
- Jika invalid/expired, biarkan lewat (non-blocking) — endpoint protected akan cek sendiri

## 3. Buat Guard Utils
File: `server/utils/guards.ts`
- `requireAuth(event)` — throw 401 jika tidak ada auth context
- `requireRole(event, roles[])` — throw 403 jika role tidak sesuai

## 4. Implementasi Endpoints
- `server/api/auth/register.post.ts`
- `server/api/auth/login.post.ts`
- `server/api/auth/logout.post.ts`
- `server/api/auth/me.get.ts`

## 5. Testing
// turbo
```bash
# Test register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","name":"Test User","email":"test@example.com","password":"Password123!"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"Password123!"}' \
  -c cookies.txt

# Test me
curl http://localhost:3000/api/auth/me -b cookies.txt

# Test logout
curl -X POST http://localhost:3000/api/auth/logout -b cookies.txt
```
