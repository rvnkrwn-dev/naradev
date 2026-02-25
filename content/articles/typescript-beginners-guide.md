---
title_id: "Panduan Lengkap Memulai TypeScript untuk Pemula"
title_en: "The Complete Beginner's Guide to TypeScript"
slug: "typescript-beginners-guide"
date: "2026-02-25T11:45:00.000Z"
description_id: "Pelajari dasar-dasar TypeScript dari nol. Mulai dari instalasi, tipe data, interface, hingga integrasi dengan proyek nyata."
description_en: "Learn TypeScript from scratch. From installation, data types, interfaces, to real-world project integration."
tags:
  - typescript
  - tutorial
  - fundamentals
status: published
authorId: "usr_0056bb11"
---
<!-- lang:id -->
# Panduan Lengkap Memulai TypeScript untuk Pemula

TypeScript adalah **superset** dari JavaScript yang menambahkan sistem tipe statis. Dengan TypeScript, kamu bisa menangkap error lebih awal — bahkan sebelum kode dijalankan.

## Mengapa TypeScript?

Bayangkan kamu punya fungsi sederhana:

```javascript
function tambahHarga(harga, pajak) {
  return harga + pajak;
}

tambahHarga("1000", 10); // "100010" — bug!
```

Dengan TypeScript, bug seperti ini **mustahil terjadi**:

```typescript
function tambahHarga(harga: number, pajak: number): number {
  return harga + pajak;
}

tambahHarga("1000", 10); // ❌ Error saat compile!
```

## Instalasi

Pastikan Node.js sudah terinstall, lalu jalankan:

```bash
npm install -g typescript
tsc --version
```

## Tipe Data Dasar

TypeScript memiliki beberapa tipe data fundamental:

```typescript
// Tipe primitif
let nama: string = "Budi";
let umur: number = 25;
let aktif: boolean = true;

// Array
let hobi: string[] = ["coding", "membaca", "gaming"];

// Tuple
let koordinat: [number, number] = [10, 20];
```

## Interface

Interface memungkinkan kamu mendefinisikan bentuk sebuah objek:

```typescript
interface Pengguna {
  nama: string;
  email: string;
  umur?: number; // opsional
}

function sapa(pengguna: Pengguna): string {
  return `Halo, ${pengguna.nama}!`;
}
```

## Union Types

Terkadang sebuah variabel bisa menerima lebih dari satu tipe:

```typescript
type Hasil = "sukses" | "gagal" | "menunggu";

function statusPesanan(status: Hasil) {
  switch (status) {
    case "sukses":
      return "Pesanan berhasil! 🎉";
    case "gagal":
      return "Pesanan gagal 😢";
    case "menunggu":
      return "Sedang diproses... ⏳";
  }
}
```

## Generics

Generics membuat fungsimu lebih fleksibel tanpa mengorbankan keamanan tipe:

```typescript
function ambilPertama<T>(daftar: T[]): T | undefined {
  return daftar[0];
}

const angka = ambilPertama([1, 2, 3]); // tipe: number
const kata = ambilPertama(["a", "b"]); // tipe: string
```

## Kesimpulan

TypeScript bukan sekadar "JavaScript dengan tipe" — ia adalah alat yang mengubah cara kamu menulis dan memelihara kode. Mulailah dari proyek kecil, dan kamu akan segera merasakan manfaatnya.

Selamat belajar! 🚀

<!-- lang:en -->
# The Complete Beginner's Guide to TypeScript

TypeScript is a **superset** of JavaScript that adds static typing. With TypeScript, you can catch errors early — even before your code runs.

## Why TypeScript?

Imagine you have a simple function:

```javascript
function addPrice(price, tax) {
  return price + tax;
}

addPrice("1000", 10); // "100010" — bug!
```

With TypeScript, bugs like this **become impossible**:

```typescript
function addPrice(price: number, tax: number): number {
  return price + tax;
}

addPrice("1000", 10); // ❌ Compile-time error!
```

## Installation

Make sure Node.js is installed, then run:

```bash
npm install -g typescript
tsc --version
```

## Basic Data Types

TypeScript has several fundamental data types:

```typescript
// Primitive types
let name: string = "Alice";
let age: number = 25;
let active: boolean = true;

// Arrays
let hobbies: string[] = ["coding", "reading", "gaming"];

// Tuples
let coordinates: [number, number] = [10, 20];
```

## Interfaces

Interfaces let you define the shape of an object:

```typescript
interface User {
  name: string;
  email: string;
  age?: number; // optional
}

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}
```

## Union Types

Sometimes a variable can hold more than one type:

```typescript
type Result = "success" | "error" | "pending";

function orderStatus(status: Result) {
  switch (status) {
    case "success":
      return "Order completed! 🎉";
    case "error":
      return "Order failed 😢";
    case "pending":
      return "Processing... ⏳";
  }
}
```

## Generics

Generics make your functions flexible without sacrificing type safety:

```typescript
function getFirst<T>(list: T[]): T | undefined {
  return list[0];
}

const num = getFirst([1, 2, 3]); // type: number
const str = getFirst(["a", "b"]); // type: string
```

## Conclusion

TypeScript isn't just "JavaScript with types" — it's a tool that transforms how you write and maintain code. Start with a small project, and you'll quickly see the benefits.

Happy coding! 🚀
