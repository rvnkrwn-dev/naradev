---
title_id: "CORS Dijelaskan untuk Pengembang"
title_en: "CORS Explained for Developers"
slug: "cors-explained-for-developers"
date: "2026-04-09T13:05:29.000Z"
description_id: "Pelajari apa itu CORS dan bagaimana cara kerjanya dalam pengembangan web."
description_en: "Learn what CORS is and how it works in web development."
tags:
  - api
  - authentication
  - cors
  - development
  - security
status: "published"
authorId: "usr_ai_security"
cover: "https://raw.githubusercontent.com/rvnkrwn-dev/naradev/dev/public/covers/cors-explained-for-developers.png"
---

<!-- lang:id -->
# CORS Dijelaskan untuk Pengembang

## Apa itu CORS?
CORS, atau Cross-Origin Resource Sharing, adalah mekanisme yang memungkinkan aplikasi web pada satu domain untuk meminta sumber daya dari domain lain. Ini penting untuk menjaga keamanan dan integritas aplikasi web. Tanpa CORS, browser melarang permintaan lintas domain untuk mencegah potensi serangan.

## Mengapa CORS Penting?
CORS penting karena:
- **Keamanan:** Mencegah skrip jahat dari domain lain untuk mengakses data sensitif.
- **Fleksibilitas:** Memungkinkan penggunaan API dan sumber daya dari domain lain dalam aplikasi anda.

## Bagaimana CORS Bekerja?
CORS bekerja dengan cara menambahkan header HTTP tertentu ke permintaan dan respons. Berikut adalah cara kerjanya: 
- Ketika permintaan dikirim ke server lain, browser akan menambahkan header `Origin` yang menunjukkan dari mana permintaan tersebut datang.

### Header CORS
Ada beberapa header yang penting saat menggunakan CORS:
1. **Access-Control-Allow-Origin**: Menentukan domain mana yang diizinkan untuk mengakses sumber daya.
2. **Access-Control-Allow-Methods**: Menunjukkan metode HTTP (GET, POST, dll.) yang diizinkan.
3. **Access-Control-Allow-Headers**: Mencakup header yang diizinkan dalam permintaan.

### Contoh Permintaan CORS
Sebagai contoh, jika Anda ingin mengizinkan permintaan dari domain `https://example.com`, Anda bisa mengonfigurasi server seperti ini:

```javascript
// Contoh menggunakan Express.js
const express = require('express');
const cors = require('cors');

const app = express();

// Izinkan permintaan dari contoh.com
app.use(cors({ origin: 'https://example.com' }));

app.get('/data', (req, res) => {
  res.json({ message: 'Data berhasil diambil!' });
});

app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});
```

## Permintaan Preflight
Permintaan CORS juga dapat melibatkan permintaan preflight, di mana browser melakukan permintaan OPTIONS sebelum melakukan permintaan sebenarnya. Hal ini dilakukan untuk memastikan metode dan header diizinkan.

### Contoh Permintaan Preflight
Berikut adalah contoh bagaimana permintaan preflight akan terlihat:

```http
OPTIONS /data HTTP/1.1
Host: api.example.com
Origin: https://example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type
```

## Tips dan Praktik Terbaik
1. **Batasi Origin**: Jangan menggunakan `*` di header `Access-Control-Allow-Origin` kecuali Anda yakin semua domain aman.
2. **Gunakan HTTPS**: Pastikan server Anda menggunakan HTTPS untuk melindungi data.
3. **Terapkan Kontrol Akses yang Ketat**: Gunakan `Access-Control-Allow-Methods` dan `Access-Control-Allow-Headers` secara spesifik.

## Kesimpulan
CORS adalah bagian penting dari keamanan aplikasi web saat menangani permintaan lintas domain. Dengan memahami bagaimana CORS bekerja, Anda dapat melindungi aplikasi Anda dari potensi ancaman. Selalu ingat untuk menerapkan praktik terbaik saat mengonfigurasi CORS. Jadikan ini bagian dari pengembangan Anda dan pastikan bahwa aplikasi Anda aman.

## Ajakan untuk Bertindak
Periksa konfigurasi CORS pada aplikasi Anda dan pastikan Anda menerapkan praktik terbaik untuk menjaga keamanan dan menghindari masalah kompatibilitas.

<!-- lang:en -->
# CORS Explained for Developers

## What is CORS?
CORS, or Cross-Origin Resource Sharing, is a mechanism that allows web applications on one domain to request resources from another domain. This is crucial for maintaining the security and integrity of web applications. Without CORS, browsers block cross-origin requests to prevent potential attacks.

## Why is CORS Important?
CORS is important because:
- **Security:** It prevents malicious scripts from other domains from accessing sensitive data.
- **Flexibility:** It allows the use of APIs and resources from other domains within your application.

## How Does CORS Work?
CORS operates by adding specific HTTP headers to requests and responses. Here’s how it works:
- When a request is sent to another server, the browser adds an `Origin` header that indicates where the request is coming from.

### CORS Headers
There are several headers that are critical when working with CORS:
1. **Access-Control-Allow-Origin**: Specifies which domain is permitted to access the resource.
2. **Access-Control-Allow-Methods**: Indicates which HTTP methods (GET, POST, etc.) are allowed.
3. **Access-Control-Allow-Headers**: Contains which headers are permitted in the request.

### Example CORS Request
For instance, if you want to allow requests from the domain `https://example.com`, you can configure your server as follows:

```javascript
// Example using Express.js
const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from example.com
app.use(cors({ origin: 'https://example.com' }));

app.get('/data', (req, res) => {
  res.json({ message: 'Data retrieved successfully!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Preflight Requests
CORS requests may also involve a preflight request, where the browser makes an OPTIONS request before performing the actual request. This is done to ensure that methods and headers are allowed.

### Preflight Request Example
Here’s how a preflight request would look:

```http
OPTIONS /data HTTP/1.1
Host: api.example.com
Origin: https://example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type
```

## Tips and Best Practices
1. **Restrict Origin:** Avoid using `*` in the `Access-Control-Allow-Origin` header unless you're sure all domains are safe.
2. **Use HTTPS:** Ensure your server is using HTTPS to protect data.
3. **Implement Strict Access Controls:** Use `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers` specifically.

## Conclusion
CORS is a vital part of web application security when handling cross-origin requests. By understanding how CORS works, you can protect your applications from potential threats. Always remember to implement best practices when configuring CORS. Make this a part of your development, and ensure your application is secure.

## Call to Action
Check your CORS configuration in your application, and make sure you are applying best practices to maintain security and avoid compatibility issues.
