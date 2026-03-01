---
title_id: "Alur Kerja GitHub Actions"
title_en: "GitHub Actions Workflows"
slug: "github-actions-workflows"
date: "2026-03-01T01:30:34.000Z"
description_id: "Pelajari cara membuat alur kerja GitHub Actions untuk otomatisasi pengembangan perangkat lunak."
description_en: "Learn how to create GitHub Actions workflows for software development automation."
tags:
  - actions
  - devops
  - docker
  - github
status: "published"
authorId: "usr_ai_devops"
cover: "https://raw.githubusercontent.com/rvnkrwn-dev/naradev/dev/public/covers/github-actions-workflows.png"
---

<!-- lang:id -->
# Alur Kerja GitHub Actions

GitHub Actions adalah fitur yang memungkinkan kita untuk mengautomatisasi berbagai tugas dalam pengembangan perangkat lunak. Dengan Actions, kita bisa membuat alur kerja (workflow) yang secara otomatis dijalankan ketika ada perubahan kode di repositori. Artikel ini akan membahas cara menyusun alur kerja GitHub Actions secara efektif.

## Apa Itu Alur Kerja GitHub Actions?

Alur kerja GitHub Actions adalah serangkaian langkah yang didefinisikan dalam file YAML. Setiap kali sebuah peristiwa (event) terjadi di repositori GitHub, alur kerja ini bisa dipicu secara otomatis. Event ini bisa berupa commit, pull request, atau bahkan penjadwalan waktu tertentu.

### Struktur Dasar Workflow

Berikut adalah struktur dasar dari sebuah workflow GitHub Actions:
```yaml
yaml
name: CI

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

## Membuat Workflow Pertama Anda

Untuk membuat workflow, pertama-tama kita harus membuat file YAML di dalam direktori `.github/workflows/`. Nama file ini bisa apa saja, namun umumnya menggunakan format `*.yml` atau `*.yaml`.

### Langkah-langkah Membuat Workflow
1. **Buat direktori**: Jika belum ada, buat direktori `.github/workflows/` di repositori Anda.
2. **Buat file YAML**: Di dalam direktori yang baru dibuat, buat file, misalnya `ci.yml`.
3. **Definisikan alur kerja**: Salin struktur workflow di atas ke dalam file yang baru dibuat.

### Contoh Workflow: Deploy ke Heroku
Berikut adalah contoh alur kerja untuk menerapkan kode ke Heroku setiap kali ada pembaruan di cabang `main`:
```yaml
name: Deploy to Heroku

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
node-version: '14'
      - name: Install dependencies
        run: npm install
      - name: Deploy to Heroku
        env:
HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: npm run deploy
```

## Tips dan Praktik Terbaik dalam Menggunakan GitHub Actions
- **Gunakan Secrets**: Simpan konfigurasi sensitif seperti token API dalam secrets GitHub untuk keamanan.
- **Optimalkan Alur Kerja**: Hanya jalankan langkah yang diperlukan untuk mempercepat proses CI/CD.
- **Baca Log**: Selalu periksa log alur kerja untuk mengidentifikasi dan memperbaiki masalah.

## Kesimpulan

GitHub Actions memberikan kemudahan dalam mengautomatisasi alur kerja pengembangan perangkat lunak. Dengan mengikuti contoh dan praktik terbaik di atas, Anda dapat membuat alur kerja yang efisien dan efektif. Jangan ragu untuk bereksperimen dengan berbagai event dan langkah untuk mendukung kebutuhan proyek Anda.

Untuk mempelajari lebih lanjut, kunjungi [dokumentasi GitHub Actions](https://docs.github.com/en/actions).

<!-- lang:en -->
# GitHub Actions Workflows

GitHub Actions is a feature that allows us to automate various tasks in software development. With Actions, we can create workflows that are automatically triggered when changes are made to the repository. This article will discuss how to effectively compose GitHub Actions workflows.

## What Is a GitHub Actions Workflow?

A GitHub Actions workflow is a series of steps defined in a YAML file. Each time an event occurs in a GitHub repository, this workflow can be automatically triggered. This event could be a commit, pull request, or even a specific scheduled time.

### Basic Workflow Structure

Here is a basic structure of a GitHub Actions workflow:
```yaml
name: CI

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

## Creating Your First Workflow

To create a workflow, we first need to create a YAML file inside the `.github/workflows/` directory. The name of this file can be anything, but it typically uses the format `*.yml` or `*.yaml`.

### Steps to Create a Workflow
1. **Create a directory**: If not already present, create the `.github/workflows/` directory in your repository.
2. **Create a YAML file**: Inside the newly created directory, create a file, for example, `ci.yml`.
3. **Define the workflow**: Copy the workflow structure above into the newly created file.

### Workflow Example: Deploy to Heroku
Here’s an example workflow for deploying code to Heroku whenever there’s an update in the `main` branch:
```yaml
name: Deploy to Heroku

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
node-version: '14'
      - name: Install dependencies
        run: npm install
      - name: Deploy to Heroku
        env:
HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: npm run deploy
```

## Tips and Best Practices for Using GitHub Actions
- **Use Secrets**: Store sensitive configuration like API tokens in GitHub secrets for security.
- **Optimize Workflows**: Only run necessary steps to speed up the CI/CD process.
- **Review Logs**: Always check the workflow logs to identify and troubleshoot issues.

## Conclusion

GitHub Actions makes it easy to automate software development workflows. By following the examples and best practices above, you can create efficient and effective workflows. Feel free to experiment with different events and steps to cater to your project needs.

To learn more, visit the [GitHub Actions documentation](https://docs.github.com/en/actions).
