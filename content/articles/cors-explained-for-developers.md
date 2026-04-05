---
title_id: "Penjelasan CORS untuk Pengembang"
title_en: "CORS Explained for Developers"
slug: "cors-explained-for-developers"
date: "2026-04-05T12:38:30.000Z"
description_id: "Pelajari tentang CORS dan cara kerjanya untuk meningkatkan keamanan aplikasi web Anda."
description_en: "Learn about CORS and how it works to enhance the security of your web applications."
tags:
  - authentication
  - cors
  - development
  - security
  - web
status: "published"
authorId: "usr_ai_security"
cover: "https://raw.githubusercontent.com/rvnkrwn-dev/naradev/dev/public/covers/cors-explained-for-developers.png"
---

<!-- lang:id -->
# Penjelasan CORS untuk Pengembang

## Apa itu CORS?
CORS, atau Cross-Origin Resource Sharing, adalah mekanisme yang digunakan oleh browser untuk mengizinkan atau membatasi permintaan antar domain di web. Tanpa menggunakan CORS, browser secara default akan mencegah suatu halaman web dari melakukan permintaan ke domain yang berbeda dari domain tempat halaman itu dilayani. Hal ini bisa menjadi masalah ketika Anda mengembangkan aplikasi web yang memerlukan data dari server yang berbeda.

## Mengapa CORS Penting?
CORS penting karena:
- **Keamanan**: Mencegah akses tidak sah ke data.
- **Interoperabilitas**: Memudahkan pengembangan aplikasi web yang berinteraksi dengan layanan lain.
- **Fleksibilitas**: Memberikan kontrol lebih kepada pengembang tentang sumber yang diizinkan.

### Bagaimana CORS Bekerja?
CORS bekerja dengan menggunakan header HTTP yang memungkinkan server untuk memberi tahu browser tentang domain mana yang diizinkan untuk mengakses sumber daya tertentu. Header yang paling umum adalah:
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`

### Contoh Kode CORS pada Server
Berikut adalah contoh bagaimana Anda dapat mengonfigurasi server Anda untuk mendukung CORS. Misalnya, jika Anda menggunakan Node.js dengan Express:

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Izinkan semua origin
app.use(cors());

app.get('/data', (req, res) => {
    res.json({ message: 'Hello from CORS-enabled server!' });
});

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
```

### Cara Menggunakan CORS di Klien
Ini adalah contoh cara untuk membuat permintaan dari klien menggunakan `fetch` yang mematuhi CORS:

```javascript
fetch('http://localhost:3000/data')
    .then(response => {
        if (!response.ok) {
  throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

### Pengaturan CORS Secara Spesifik
Untuk mengizinkan akses hanya dari domain tertentu:

```javascript
app.use(cors({ origin: 'http://example.com' }));
```

## Best Practices dalam Menggunakan CORS
1. **Gunakan CORS dengan Bijak**: Hanya izinkan domain yang diperlukan.
2. **Kelola Metode Permintaan**: Jangan izinkan semua metode jika tidak diperlukan.
3. **Amankan Header**: Pastikan Anda hanya mengizinkan header yang diperlukan.
4. **Uji Secara Menyeluruh**: Selalu lakukan pengujian pada pengaturan CORS Anda untuk memastikan tidak ada celah keamanan.

## Kesimpulan
CORS adalah mekanisme penting dalam pengembangan aplikasi web modern. Dengan memahami cara kerjanya dan menerapkan praktik terbaik, Anda dapat meningkatkan keamanan dan kinerja aplikasi Anda.

### Ajakan untuk Bertindak
Jelajahi implementasi CORS di aplikasi Anda dan pastikan bahwa Anda mematuhi semua langkah pencegahan keamanan yang diperlukan. Jangan ragu untuk berbagi pengalaman Anda dengan komunitas pengembang!

<!-- lang:en -->
# CORS Explained for Developers

## What is CORS?
CORS, or Cross-Origin Resource Sharing, is a mechanism used by browsers to allow or restrict requests coming from different origins on the web. Without CORS, browsers will prevent a web page from making requests to a domain different from the one serving that page by default. This can be an issue when developing web applications that require data from different servers.

## Why is CORS Important?
CORS is important because:
- **Security**: Prevents unauthorized access to data.
- **Interoperability**: Facilitates the development of web applications that interact with other services.
- **Flexibility**: Provides developers with more control over which sources are allowed.

### How Does CORS Work?
CORS works using HTTP headers that allow the server to tell the browser which domains are allowed to access specific resources. The most common headers include:
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`

### CORS Implementation on Server
Here is an example of how you can configure your server to support CORS, using Node.js with Express:

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Allow all origins
app.use(cors());

app.get('/data', (req, res) => {
    res.json({ message: 'Hello from CORS-enabled server!' });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
```

### How to Use CORS in Client
Here is an example of how to make a request from the client using `fetch`, complying with CORS:

```javascript
fetch('http://localhost:3000/data')
    .then(response => {
        if (!response.ok) {
  throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

### Specific CORS Settings
To allow access only from specific domains:

```javascript
app.use(cors({ origin: 'http://example.com' }));
```

## CORS Best Practices
1. **Use CORS Wisely**: Only allow necessary domains.
2. **Manage Request Methods**: Don’t allow all methods if unnecessary.
3. **Secure Headers**: Ensure only necessary headers are permitted.
4. **Test Thoroughly**: Always test your CORS settings to ensure there are no security gaps.

## Conclusion
CORS is a crucial mechanism in modern web application development. By understanding how it works and implementing best practices, you can enhance your application’s security and performance.

### Call to Action
Explore the implementation of CORS in your applications and ensure you're adhering to all necessary security precautions. Feel free to share your experiences with the developer community!
