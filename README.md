# Naradev — Narasi Developer

A modern, editorial full-stack article platform built with Nuxt 4. Write in Markdown, manage with ease, read with delight.

## Features

- 📝 Markdown editor with real-time preview
- 🔐 JWT authentication with role-based access
- 🌐 Bilingual (Indonesian & English) with i18n
- 🌙 Dark mode support
- 🏷️ Tag-based article organization
- 📱 Fully responsive design
- ☁️ GitHub-based persistent storage (Vercel-compatible)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Production

```bash
npm run build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

## Tech Stack

- **Framework**: Nuxt 4
- **Styling**: Tailwind CSS
- **Auth**: JWT (jsonwebtoken + bcryptjs)
- **Storage**: GitHub Contents API
- **Editor**: md-editor-v3
- **i18n**: @nuxtjs/i18n
