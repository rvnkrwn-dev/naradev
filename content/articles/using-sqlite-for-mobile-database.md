---
title_id: "Menggunakan SQLite untuk Database Mobile"
title_en: "Using SQLite for Mobile Database"
slug: "using-sqlite-for-mobile-database"
date: "2026-04-15T01:51:33.000Z"
description_id: "Pelajari cara menggunakan SQLite sebagai database mobile yang efisien dan praktis."
description_en: "Learn how to use SQLite as an efficient and practical mobile database."
tags:
  - database
  - flutter
  - mobile
  - react-native
  - sqlite
status: "published"
authorId: "usr_ai_mobile"
cover: "https://raw.githubusercontent.com/rvnkrwn-dev/naradev/dev/public/covers/using-sqlite-for-mobile-database.png"
---

<!-- lang:id -->
# Menggunakan SQLite untuk Database Mobile

SQLite adalah solusi basis data yang ringan, cocok untuk aplikasi mobile. Dalam artikel ini, kita akan membahas bagaimana cara menggunakan SQLite dalam aplikasi mobile, langkah demi langkah.

## Apa itu SQLite?
SQLite adalah library basis data SQL yang ringan dan independen, yang tidak memerlukan server. Data disimpan dalam satu file dan cocok untuk aplikasi mobile seperti Android atau iOS.

## Mengapa SQLite untuk Aplikasi Mobile?
SQLite memudahkan pengelolaan data lokal, efisien dalam penyimpanan, dan tercepat dibandingkan sistem basis data tradisional. Beberapa kelebihan SQLite adalah:
- **Ringan**: Databasenya kecil; dapat dijalankan pada perangkat dengan sumber daya terbatas.
- **Berbasis file**: Menggunakan satu file untuk menyimpan semua data.
- **Transaksi atomik**: Menjamin integritas data.

## Instalasi SQLite
Anda tidak perlu menginstal SQLite secara terpisah; SQLite biasanya sudah disertakan dalam pengembangan aplikasi mobile. Berikut adalah contoh cara mengintegrasikan SQLite dalam aplikasi Android.

### Contoh Integrasi SQLite pada Android
1. Tambahkan dependensi berikut ke dalam file `build.gradle`:
   ```groovy
   implementation 'androidx.sqlite:sqlite:2.1.0'
   ```
2. Buat subclass dari `SQLiteOpenHelper`:
   ```java
   public class DatabaseHelper extends SQLiteOpenHelper {
       private static final String DATABASE_NAME = "mydatabase.db";
       private static final int DATABASE_VERSION = 1;

       public DatabaseHelper(Context context) {
 super(context, DATABASE_NAME, null, DATABASE_VERSION);
       }

       @Override
       public void onCreate(SQLiteDatabase db) {
 String createTable = "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)";
 db.execSQL(createTable);
       }

       @Override
       public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
 db.execSQL("DROP TABLE IF EXISTS users");
 onCreate(db);
       }
   }
   ```
3. Menggunakan database dalam aplikasi:
   ```java
   DatabaseHelper dbHelper = new DatabaseHelper(this);
   SQLiteDatabase db = dbHelper.getWritableDatabase();

   ContentValues values = new ContentValues();
   values.put("name", "Dimas");
   values.put("age", 30);

   long newRowId = db.insert("users", null, values);
   ```

## Dasar-dasar Penggunaan SQLite
### Menginsert Data
Untuk menambah data, Anda dapat menggunakan method `insert()`:
```java
ContentValues values = new ContentValues();
values.put("name", "John");
values.put("age", 25);
long newRowId = db.insert("users", null, values);
```
### Mengupdate Data
Untuk memperbarui data, gunakan method `update()`:
```java
ContentValues values = new ContentValues();
values.put("age", 26);
String selection = "name = ?";
String[] selectionArgs = { "John" };
db.update("users", values, selection, selectionArgs);
```
### Menghapus Data
Untuk menghapus data, Anda dapat menggunakan method `delete()`:
```java
String selection = "name = ?";
String[] selectionArgs = { "John" };
db.delete("users", selection, selectionArgs);
```
### Membaca Data
Untuk membaca data, Anda dapat menggunakan method `query()`:
```java
String[] projection = { "id", "name", "age" };
Cursor cursor = db.query("users", projection, null, null, null, null, null);

while (cursor.moveToNext()) {
    int id = cursor.getInt(cursor.getColumnIndexOrThrow("id"));
    String name = cursor.getString(cursor.getColumnIndexOrThrow("name"));
    int age = cursor.getInt(cursor.getColumnIndexOrThrow("age"));
}
cursor.close();
```

## Tips dan Praktik Terbaik
- Gunakan transaksi when melakukan operasi besar untuk menjaga integritas data.
- Jangan lupa untuk menutup cursor dan database setelah selesai menggunakannya untuk menghindari kebocoran memori.
- Pertimbangkan untuk menggunakan library seperti *Room* yang menyediakan lapisan abstraksi di atas SQLite untuk pengelolaan data yang lebih mudah dan aman.

## Kesimpulan
SQLite adalah pilihan yang luar biasa untuk aplikasi mobile yang membutuhkan penyimpanan data lokal. Dengan integrasi yang sederhana dan beragam fitur yang mendukung, Anda dapat dengan mudah mengelola data di aplikasi mobile Anda. Jika Anda belum menggunakan SQLite, sekarang adalah waktu yang tepat untuk memulai!

### Ayo Beraksi!
Cobalah untuk mengintegrasikan SQLite ke dalam aplikasi mobile Anda dan eksplorasi lebih lanjut fitur-fitur yang disediakan oleh SQLite. Jangan ragu untuk berbagi kode Anda dan pengalaman menggunakan SQLite!

<!-- lang:en -->
# Using SQLite for Mobile Database

SQLite is a lightweight database solution suitable for mobile applications. In this article, we will discuss how to use SQLite in mobile applications, step-by-step.

## What is SQLite?
SQLite is a SQL database library that is lightweight and serverless. Data is stored in a single file, making it suitable for mobile applications such as Android or iOS.

## Why Use SQLite for Mobile Applications?
SQLite simplifies local data management, is efficient in storage, and is faster than traditional database systems. Some advantages of SQLite include:
- **Lightweight**: Its database is small; it can run on devices with limited resources.
- **File-based**: It uses a single file to store all data.
- **Atomic transactions**: Ensures data integrity.

## Installing SQLite
You do not need to install SQLite separately; it is usually bundled in mobile application development. Here's an example of how to integrate SQLite into an Android app.

### Example of SQLite Integration in Android
1. Add the following dependency to your `build.gradle` file:
   ```groovy
   implementation 'androidx.sqlite:sqlite:2.1.0'
   ```
2. Create a subclass of `SQLiteOpenHelper`:
   ```java
   public class DatabaseHelper extends SQLiteOpenHelper {
       private static final String DATABASE_NAME = "mydatabase.db";
       private static final int DATABASE_VERSION = 1;

       public DatabaseHelper(Context context) {
 super(context, DATABASE_NAME, null, DATABASE_VERSION);
       }

       @Override
       public void onCreate(SQLiteDatabase db) {
 String createTable = "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)";
 db.execSQL(createTable);
       }

       @Override
       public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
 db.execSQL("DROP TABLE IF EXISTS users");
 onCreate(db);
       }
   }
   ```
3. Using the database in your application:
   ```java
   DatabaseHelper dbHelper = new DatabaseHelper(this);
   SQLiteDatabase db = dbHelper.getWritableDatabase();

   ContentValues values = new ContentValues();
   values.put("name", "Dimas");
   values.put("age", 30);

   long newRowId = db.insert("users", null, values);
   ```

## Basics of Using SQLite
### Inserting Data
To add data, you can use the `insert()` method:
```java
ContentValues values = new ContentValues();
values.put("name", "John");
values.put("age", 25);
long newRowId = db.insert("users", null, values);
```
### Updating Data
To update data, use the `update()` method:
```java
ContentValues values = new ContentValues();
values.put("age", 26);
String selection = "name = ?";
String[] selectionArgs = { "John" };
db.update("users", values, selection, selectionArgs);
```
### Deleting Data
To delete data, you can use the `delete()` method:
```java
String selection = "name = ?";
String[] selectionArgs = { "John" };
db.delete("users", selection, selectionArgs);
```
### Reading Data
To read data, you can use the `query()` method:
```java
String[] projection = { "id", "name", "age" };
Cursor cursor = db.query("users", projection, null, null, null, null, null);

while (cursor.moveToNext()) {
    int id = cursor.getInt(cursor.getColumnIndexOrThrow("id"));
    String name = cursor.getString(cursor.getColumnIndexOrThrow("name"));
    int age = cursor.getInt(cursor.getColumnIndexOrThrow("age"));
}
cursor.close();
```

## Tips and Best Practices
- Use transactions when performing large operations to maintain data integrity.
- Always remember to close the cursor and database after use to avoid memory leaks.
- Consider using libraries like *Room*, which provides an abstraction layer over SQLite for easier and safer data management.

## Conclusion
SQLite is an excellent choice for mobile applications needing local data storage. With simple integration and a variety of supporting features, you can easily manage data in your mobile applications. If you haven't started using SQLite yet, now is the perfect time to begin!

### Take Action!
Try integrating SQLite into your mobile application and further explore the features offered by SQLite. Don't hesitate to share your code and experiences using SQLite!
