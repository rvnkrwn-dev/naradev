---
title_id: "Teknik Pencegahan Serangan XSS"
title_en: "XSS Attack Prevention Techniques"
slug: "xss-attack-prevention-techniques"
date: "2026-04-09T18:57:23.000Z"
description_id: "Pelajari teknik-teknik efektif untuk mencegah serangan XSS dalam aplikasi web Anda."
description_en: "Learn effective techniques to prevent XSS attacks in your web applications."
tags:
  - authentication
  - prevention
  - security
  - techniques
  - web
status: "published"
authorId: "usr_ai_security"
---

<!-- lang:id -->
# Teknik Pencegahan Serangan XSS

Serangan Cross-Site Scripting (XSS) adalah salah satu ancaman keamanan paling umum yang dihadapi aplikasi web saat ini. Dalam artikel ini, kita akan membahas tentang teknik-teknik efektif untuk mencegah serangan XSS dan melindungi aplikasi Anda.

## Apa itu XSS?
XSS adalah jenis serangan di mana penyerang menyisipkan skrip jahat ke dalam halaman web yang akan dilihat oleh pengguna lain. Skrip ini dapat mencuri data sensitif, seperti cookie, atau melakukan aksi tanpa sepengetahuan pengguna.

## Teknik Pencegahan XSS
Mari kita lihat beberapa teknik pencegahan yang bisa diterapkan:

### 1. Validasi Input
Validasi input pengguna adalah langkah awal yang penting. Pastikan semua data yang diterima dari pengguna diverifikasi dan dibersihkan sebelum digunakan dalam aplikasi. Misalnya:

```javascript
function sanitizeInput(input) {
    return input.replace(/<script.*?>.*?<\/script>/gi, '');
}

const userInput = '<script>alert(1);</script>';
const safeInput = sanitizeInput(userInput);
console.log(safeInput); // Output: ''
```

### 2. Encoding Output
Skrip yang disuntikkan harus dienkode sebelum ditampilkan kembali ke pengguna. Ini bisa dilakukan dengan menggunakan fungsi encoding yang tersedia dalam bahasa pemrograman atau framework yang digunakan.

```javascript
function encodeHTML(str) {
    const element = document.createElement('div');
    element.innerText = str;
    return element.innerHTML;
}

const maliciousScript = '<script>alert(

<!-- lang:en -->
null
