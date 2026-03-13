---
title_id: "Panduan Content Security Policy (CSP)"
title_en: "Content Security Policy (CSP) Guide"
slug: "content-security-policy-csp-guide"
date: "2026-03-13T06:48:20.000Z"
description_id: "Pelajari cara mengimplementasikan Content Security Policy (CSP) untuk melindungi situs web Anda dari serangan XSS."
description_en: "Learn how to implement Content Security Policy (CSP) to protect your website against XSS attacks."
tags:
  - authentication
  - csp
  - security
  - web
status: "published"
authorId: "usr_ai_security"
cover: "https://raw.githubusercontent.com/rvnkrwn-dev/naradev/dev/public/covers/content-security-policy-csp-guide.png"
---

<!-- lang:id -->
# Panduan Content Security Policy (CSP)

Content Security Policy (CSP) adalah mekanisme keamanan yang dirancang untuk mencegah berbagai jenis serangan seperti Cross-Site Scripting (XSS) dan data injection yang berbahaya. Dalam panduan ini, kita akan membahas secara mendalam tentang apa itu CSP, cara kerjanya, dan bagaimana cara mengimplementasikannya dengan baik.

## Apa Itu Content Security Policy?
Content Security Policy adalah kebijakan yang diberikan oleh server dalam header HTTP untuk memberitahu browser tentang sumber daya mana yang boleh dimuat untuk halaman web. CSP membantu mengurangi risiko memasukkan skrip jahat yang bisa dieksekusi oleh browser.

## Mengapa CSP Penting?
CSP sangat penting bagi keamanan web, terutama mengingat meningkatnya jumlah serangan XSS. Dengan menerapkan CSP, Anda memberikan instruksi kepada browser untuk membatasi halaman web mana yang dapat memuat skrip, gambar, dan sumber daya lainnya.

### Mengurangi Serangan XSS
Dengan menggunakan CSP, Anda dapat membatasi skrip yang dapat dijalankan di halaman Anda, sehingga mengurangi risiko serangan XSS.

### Mengontrol Beban Sumber Daya
CSP memungkinkan Anda mengontrol dari mana sumber daya seperti gambar dan skrip dapat dimuat. Ini memberi Anda kendali lebih pada perangkat lunak Anda.

## Cara Kerja CSP
CSP bekerja dengan menggunakan header HTTP, yang dapat Anda tambahkan pada server Anda. Berikut adalah contoh sederhana:

```http
Content-Security-Policy: default-src 'self'; img-src https://example.com;
```

Dalam contoh di atas, `default-src` mengizinkan skrip hanya dari domain yang sama (`'self'`), dan `img-src` mengizinkan gambar hanya dari `https://example.com`.

## Mengimplementasikan CSP
### Langkah 1: Menambahkan Header CSP ke Server Anda
Anda perlu menambahkan header CSP ini ke konfigurasi server Anda. Berikut adalah cara melakukannya pada server Nginx:

```nginx
add_header Content-Security-Policy "default-src 'self'; img-src https://example.com;";
```

Dan pada server Apache:

```apache
Header set Content-Security-Policy "default-src 'self'; img-src https://example.com;"
```

### Langkah 2: Menguji CSP Anda
Setelah Anda mengonfigurasi CSP, penting untuk menguji apakah kebijakan tersebut berjalan dengan baik. Anda dapat menggunakan alat seperti Google Lighthouse atau CSP Evaluator.

## Kesalahan Umum dan Cara Menghindarinya
### 1. Mengizinkan Sumber Tidak Terpercaya
Menghindari penggunaan `unsafe-inline` dan `unsafe-eval` akan sangat meningkatkan keamanan Anda.
### 2. Kurang Mengatur Sumber Daya
Pastikan Anda mengatur semua jenis sumber daya yang digunakan dalam aplikasi Anda, termasuk font dan CSS.

## Praktik Terbaik untuk CSP
- **Gunakan `report-uri`** atau `report-to` untuk melacak pelanggaran CSP.
- **Mulai dengan mode `Report-Only`** untuk menguji kebijakan tanpa menegakkannya.
- **Perbarui kebijakan Anda secara teratur** setiap kali Anda memperbarui aplikasi.

## Kesimpulan
Mengimplementasikan Content Security Policy (CSP) sangat penting untuk menjaga keamanan aplikasi web Anda dan melindungi dari serangan XSS. Pastikan untuk Mengujinya secara berkala dan melakukan revisi sesuai kebutuhan.

Jadi, mulailah melindungi aplikasi Anda menggunakan CSP sekarang juga!

## Call to Action
Jika Anda memiliki pertanyaan lebih lanjut tentang CSP atau perlu bantuan dalam pengaturannya, jangan ragu untuk menghubungi kami!

<!-- lang:en -->
# Content Security Policy (CSP) Guide

Content Security Policy (CSP) is a security mechanism designed to prevent various types of attacks such as Cross-Site Scripting (XSS) and data injection attacks. In this guide, we'll discuss in-depth what CSP is, how it works, and how to implement it effectively.

## What is Content Security Policy?
Content Security Policy is a policy provided by the server in the HTTP header to inform the browser about which resources are allowed to be loaded for a web page. CSP helps mitigate the risk of malicious scripts being executed by the browser.

## Why is CSP Important?
CSP is crucial for web security, especially given the growing number of XSS attacks. By implementing CSP, you instruct the browser to limit which web pages can load scripts, images, and other resources.

### Reducing XSS Attacks
By using CSP, you can restrict which scripts can run on your page, thereby reducing the risk of XSS attacks.

### Controlling Resource Loading
CSP allows you to control from where resources such as images and scripts can be loaded. This gives you more control over your software.

## How CSP Works
CSP works by using HTTP headers, which you can add to your server. Here is a simple example:

```http
Content-Security-Policy: default-src 'self'; img-src https://example.com;
```

In the example above, `default-src` allows scripts only from the same origin (`'self'`), and `img-src` allows images only from `https://example.com`.

## Implementing CSP
### Step 1: Add CSP Header to Your Server
You need to add this CSP header to your server configuration. Here’s how to do it on Nginx:

```nginx
add_header Content-Security-Policy "default-src 'self'; img-src https://example.com;";
```

And on Apache:

```apache
Header set Content-Security-Policy "default-src 'self'; img-src https://example.com;"
```

### Step 2: Test Your CSP
After configuring your CSP, it’s essential to test whether the policy is working effectively. You can use tools like Google Lighthouse or CSP Evaluator.

## Common Mistakes and How to Avoid Them
### 1. Allowing Untrusted Sources
Avoid using `unsafe-inline` and `unsafe-eval`, as these significantly reduce your security.
### 2. Failing to Configure Resources
Ensure you configure all types of resources used in your application, including fonts and CSS.

## Best Practices for CSP
- **Use `report-uri` or `report-to`** to track CSP violations.
- **Start with `Report-Only` mode** to test policies without enforcing them.
- **Regularly update your policy** whenever you update your application.

## Conclusion
Implementing Content Security Policy (CSP) is vital for ensuring the security of your web applications and protecting them from XSS attacks. Be sure to test it periodically and revise it as needed.

So, start securing your applications using CSP today!

## Call to Action
If you have further questions about CSP or need assistance in setting it up, feel free to contact us!
