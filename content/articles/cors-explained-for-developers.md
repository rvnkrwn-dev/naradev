---
title_id: "Penjelasan CORS untuk Pengembang"
title_en: "CORS Explained for Developers"
slug: "cors-explained-for-developers"
date: "2026-03-31T07:05:02.000Z"
description_id: "Pelajari tentang CORS, cara kerjanya, dan praktik terbaik untuk pengembang dalam menangani permintaan lintas domain."
description_en: "Learn about CORS, how it works, and best practices for developers in handling cross-origin requests."
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
# Penjelasan CORS untuk Pengembang

CORS (Cross-Origin Resource Sharing) adalah mekanisme yang digunakan oleh browser untuk memungkinkan atau membatasi permintaan lintas domain pada aplikasi web. Dalam artikel ini, kita akan menjelaskan secara mendetail bagaimana CORS bekerja, alasan penerapannya, serta praktik terbaik yang bisa diterapkan oleh pengembang.

## Apa Itu CORS?

CORS adalah protokol yang memungkinkan server mengontrol akses ke sumber daya dari domain lain. Dengan kata lain, CORS memungkinkan web application yang dijalankan di satu domain (misalnya `example.com`) untuk mengakses sumber daya di domain lain (misalnya `api.example.com`).

## Mengapa CORS Penting?

CORS penting karena alasan keamanan. Dengan membatasi permintaan lintas domain, pihak yang tidak berwenang tidak dapat mengakses data sensitif di server. Tanpa CORS, aplikasi web Anda berpotensi terekspos kepada serangan seperti Cross-Site Request Forgery (CSRF) dan data pencurian.

## Bagaimana CORS Bekerja?

Ketika sebuah aplikasi web melakukan permintaan ke server di domain lain, browser mengirimkan permintaan OPTIONS terlebih dahulu. Ini disebut preflight request. Contohnya:

```http
OPTIONS /api/data HTTP/1.1
Host: api.example.com
Origin: http://example.com
```  

Server kemudian merespon dengan headers CORS:

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://example.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```  

Jika server menyetujui permintaan, maka browser akan melanjutkan dengan permintaan yang sebenarnya.

## Mengonfigurasi CORS di Server

Berikut adalah contoh bagaimana mengonfigurasi CORS di server Node.js menggunakan Express:

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Mengaktifkan CORS untuk semua origin
app.use(cors());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from CORS-enabled server!' });
});

app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});
```

### Contoh Konfigurasi CORS dengan Pengaturan Khusus

Terkadang, Anda hanya ingin mengizinkan domain tertentu. Berikut adalah contoh mengonfigurasi CORS untuk mengizinkan hanya `http://example.com`:

```javascript
app.use(cors({
  origin: 'http://example.com',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
}));
```

## Praktik Terbaik dalam Mengelola CORS

1. **Batasi Origin**: Hanya izinkan origin yang perlu. Ini mengurangi risiko keamanan.
2. **Gunakan Preflight Requests secara Cerdas**: Minimalkan penggunaan preflight request dengan memastikan permintaan Anda sederhana.
3. **Kendalikan Metode dan Header**: Hanya izinkan metode dan header yang diperlukan untuk permintaan Anda.
4. **Audit dan Monitor**: Selalu audit pengaturan CORS Anda dan monitor log untuk aktivitas abnormal.

## Kesimpulan

CORS adalah topik penting bagi pengembang web yang berinteraksi dengan API lintas domain. Dengan memahami cara kerja dan cara mengaturnya, Anda dapat meningkatkan keamanan aplikasi Anda. Jangan ragu untuk bereksperimen dengan pengaturan CORS dan terapkan praktik terbaik yang telah dibahas.

Ayo lakukan pengujian dan konfigurasi CORS di aplikasi Anda hari ini!

---

# CORS Explained for Developers

CORS (Cross-Origin Resource Sharing) is a mechanism used by browsers to allow or restrict cross-domain requests in web applications. In this article, we will explain in detail how CORS works, the reasons for its implementation, and best practices developers can adopt.

## What is CORS?

CORS is a protocol that enables servers to control access to resources from different domains. In other words, CORS allows a web application running on one domain (e.g., `example.com`) to access resources on another domain (e.g., `api.example.com`).

## Why is CORS Important?

CORS is crucial due to security reasons. By restricting cross-domain requests, unauthorized parties cannot access sensitive data on servers. Without CORS, your web applications could be exposed to vulnerabilities such as Cross-Site Request Forgery (CSRF) and data theft.

## How CORS Works?

When a web application makes a request to a server on another domain, the browser first sends an OPTIONS request. This is called a preflight request. For example:

```http
OPTIONS /api/data HTTP/1.1
Host: api.example.com
Origin: http://example.com
```  

The server then responds with CORS headers:

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://example.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```  

If the server allows the request, the browser proceeds with the actual request.

## Configuring CORS on the Server

Here is an example of how to configure CORS in a Node.js server using Express:

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from CORS-enabled server!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Example of CORS Configuration with Specific Settings

Sometimes you may only want to allow specific domains. Here’s how to configure CORS to only allow `http://example.com`:

```javascript
app.use(cors({
  origin: 'http://example.com',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
}));
```

## Best Practices in Managing CORS

1. **Limit Origins**: Only allow necessary origins. This reduces security risks.
2. **Use Preflight Requests Wisely**: Minimize the use of preflight requests by ensuring your requests are simple.
3. **Control Methods and Headers**: Only allow methods and headers required for your requests.
4. **Audit and Monitor**: Always audit your CORS settings and monitor logs for abnormal activity.

## Conclusion

CORS is an important topic for web developers interacting with cross-domain APIs. By understanding how it works and how to set it up, you can enhance your application's security. Don’t hesitate to experiment with CORS settings and apply the best practices discussed.

Start testing and configuring CORS in your applications today!

<!-- lang:en -->
null
