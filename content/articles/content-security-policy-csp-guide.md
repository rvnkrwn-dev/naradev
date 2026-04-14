---
title_id: "Panduan Kebijakan Keamanan Konten (CSP)"
title_en: "Content Security Policy (CSP) Guide"
slug: "content-security-policy-csp-guide"
date: "2026-04-14T13:09:39.000Z"
description_id: "Pelajari cara melindungi situs Anda dari serangan dengan Kebijakan Keamanan Konten (CSP)."
description_en: "Learn how to protect your site from attacks with Content Security Policy (CSP)."
tags:
  - authentication
  - csp
  - policy
  - security
  - web
status: "published"
authorId: "usr_ai_security"
cover: "https://raw.githubusercontent.com/rvnkrwn-dev/naradev/dev/public/covers/content-security-policy-csp-guide.png"
---

<!-- lang:id -->
# Panduan Kebijakan Keamanan Konten (CSP)

Kebijakan Keamanan Konten (CSP) adalah mekanisme penting dalam keamanan web yang membantu mencegah berbagai jenis serangan, termasuk serangan XSS (Cross-Site Scripting) dan penginjakan data. Dengan CSP, Anda dapat mengendalikan sumber daya apa yang dapat dimuat dan dijalankan di browser.

## Apa itu Content Security Policy?

CSP adalah header HTTP yang memberikan kepada pengembang web cara untuk menetapkan kebijakan mengenai sumber daya yang diizinkan untuk dimuat pada halaman web. Misalnya, Anda dapat menentukan bahwa hanya skrip yang berasal dari domain tertentu yang dapat dijalankan.

### Manfaat CSP

1. **Mengurangi risiko serangan XSS:** Dengan CSP, jika penyerang mencoba untuk menyisipkan skrip berbahaya, maka skrip tersebut tidak akan dijalankan.
2. **Membantu merumuskan kebijakan keamanan:** CSP membantu dalam mendefinisikan sumber daya mana yang diizinkan untuk berinteraksi dengan halaman.
3. **Meningkatkan kepercayaan pengguna:** Dengan mengadopsi praktik keamanan yang baik, Anda dapat meningkatkan kepercayaan dari pengguna Anda.

## Cara Mengimplementasikan CSP

Untuk mengimplementasikan CSP, Anda perlu menambahkan header CSP ke server Anda. Berikut adalah langkah-langkah untuk melakukannya:

### 1. Menentukan kebijakan CSP

Kebijakan CSP ditulis dalam bentuk string yang diletakkan dalam header `Content-Security-Policy`. Berikut contoh kebijakan dasar:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com;
```

- `default-src` mengatur sumber daya default yang diizinkan, di sini hanya untuk domain yang sama (`'self'`).
- `script-src` spesifik untuk skrip dan mengizinkan skrip dari domain `trusted.com`.

### 2. Menggunakan CSP di server

Misalkan Anda menggunakan *Express.js* dalam aplikasi Node.js. Berikut adalah cara menambahkannya:

```javascript
const express = require('express');
const helmet = require('helmet');

const app = express();

// Menambahkan CSP menggunakan helmet
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [

<!-- lang:en -->
null
