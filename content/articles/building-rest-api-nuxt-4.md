---
title_id: Building a REST API with Nuxt 4 Server Routes
title_en: Building a REST API with Nuxt 4 Server Routes
slug: building-rest-api-nuxt-4
date: '2026-02-22T14:30:00.000Z'
description_id: >-
  Learn how to build a full-featured REST API using Nuxt 4's built-in server
  engine. We'll cover route handlers, validation, authentication middleware, and
  error handling with real-world patterns.
description_en: >-
  Learn how to build a full-featured REST API using Nuxt 4's built-in server
  engine. We'll cover route handlers, validation, authentication middleware, and
  error handling with real-world patterns.
tags:
  - nuxt
  - api
  - tutorial
  - typescript
status: published
authorId: usr_0056bb11
---
<!-- lang:id -->
# Building a REST API with Nuxt 4 Server Routes

One of Nuxt's most powerful (and underrated) features is its built-in server engine powered by **Nitro**. You can build a complete REST API right alongside your frontend — no Express, no Fastify, no separate backend needed.

In this guide, we'll build a production-ready API with authentication, validation, and proper error handling.

## Project Structure

Nuxt 4 uses a clean file-based routing system for server endpoints:

```
server/
├── api/
│   ├── articles/
│   │   ├── index.get.ts      # GET /api/articles
│   │   ├── index.post.ts     # POST /api/articles
│   │   └── [slug].get.ts     # GET /api/articles/:slug
│   └── auth/
│       ├── login.post.ts     # POST /api/auth/login
│       └── me.get.ts         # GET /api/auth/me
├── middleware/
│   └── auth.ts               # Authentication middleware
└── utils/
    └── validation.ts         # Shared utilities
```

The file name convention `index.get.ts` tells Nuxt both the HTTP method and the path. Clean and intuitive.

## Your First Endpoint

Let's start with a simple GET endpoint:

```typescript
// server/api/articles/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const articles = await getArticles({ page, limit });

  return {
    success: true,
    articles,
    total: articles.length,
    page,
    limit,
  };
});
```

`defineEventHandler` is the core primitive. It receives an `event` object (from H3, Nitro's HTTP framework) and can return any serializable value.

## Request Validation

Never trust user input. Here's a pattern using Zod for runtime validation:

```typescript
// server/utils/validation.ts
import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(3).max(200),
  markdown: z.string().min(10),
  tags: z.array(z.string()).max(5),
  description: z.string().max(500).optional(),
  status: z.enum(['draft', 'published']).default('draft'),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
```

Then use it in your POST handler:

```typescript
// server/api/articles/index.post.ts
import { createArticleSchema } from '../../utils/validation';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate input
  const result = createArticleSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Validation failed',
      data: result.error.flatten(),
    });
  }

  const article = await saveArticle(result.data);

  return { success: true, slug: article.slug };
});
```

## Authentication Middleware

Protect routes with server middleware:

```typescript
// server/middleware/auth.ts
import { verifyToken } from '../utils/auth';

export default defineEventHandler(async (event) => {
  // Only protect /api/admin/* routes
  const path = getRequestURL(event).pathname;
  if (!path.startsWith('/api/admin')) return;

  const token = getCookie(event, 'auth_token');
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Authentication required',
    });
  }

  try {
    const payload = verifyToken(token);
    event.context.auth = payload;
  } catch {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired token',
    });
  }
});
```

The middleware runs **before** your route handlers. By attaching the user data to `event.context.auth`, downstream handlers can access it easily.

## Error Handling

Nuxt/Nitro has built-in error handling with `createError`:

```typescript
// Throw structured errors
throw createError({
  statusCode: 404,
  message: 'Article not found',
});

// With additional data
throw createError({
  statusCode: 422,
  message: 'Validation failed',
  data: { field: 'title', error: 'Too short' },
});
```

These automatically get serialized into proper HTTP responses with the correct status code.

## Dynamic Route Parameters

Use bracket syntax for dynamic segments:

```typescript
// server/api/articles/[slug].get.ts
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required' });
  }

  const article = await getArticleBySlug(slug);

  if (!article) {
    throw createError({ statusCode: 404, message: 'Article not found' });
  }

  return { success: true, article };
});
```

## Best Practices

### 1. Separate Concerns

Keep your route handlers thin. Move business logic to utility functions:

```typescript
// ✅ Good: handler is just a thin controller
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const article = await getArticleBySlug(slug);
  return { success: true, article };
});

// ❌ Bad: business logic in the handler
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const files = await readdir('./content');
  const file = files.find(f => f === `${slug}.md`);
  const raw = await readFile(`./content/${file}`, 'utf-8');
  // ... parsing, transforming, etc.
});
```

### 2. Use TypeScript

Type your responses for end-to-end safety:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### 3. Handle Edge Cases

Always validate parameters, handle missing data gracefully, and return meaningful error messages:

```typescript
if (!slug || typeof slug !== 'string') {
  throw createError({ statusCode: 400, message: 'Invalid slug' });
}
```

## Conclusion

Nuxt 4's server routes give you everything you need to build a robust API:

- **File-based routing** — intuitive and organized
- **Built-in middleware** — authentication, logging, etc.
- **H3 utilities** — `getQuery`, `readBody`, `getCookie`, etc.
- **TypeScript support** — full type safety out of the box
- **Auto-imports** — `defineEventHandler`, `createError`, etc.

The best part? Your API deploys alongside your frontend, on any platform Nitro supports — from Node.js to Cloudflare Workers to Vercel Edge Functions.

Build full-stack, ship faster. 🛠️

<!-- lang:en -->
# Building a REST API with Nuxt 4 Server Routes

One of Nuxt's most powerful (and underrated) features is its built-in server engine powered by **Nitro**. You can build a complete REST API right alongside your frontend — no Express, no Fastify, no separate backend needed.

In this guide, we'll build a production-ready API with authentication, validation, and proper error handling.

## Project Structure

Nuxt 4 uses a clean file-based routing system for server endpoints:

```
server/
├── api/
│   ├── articles/
│   │   ├── index.get.ts      # GET /api/articles
│   │   ├── index.post.ts     # POST /api/articles
│   │   └── [slug].get.ts     # GET /api/articles/:slug
│   └── auth/
│       ├── login.post.ts     # POST /api/auth/login
│       └── me.get.ts         # GET /api/auth/me
├── middleware/
│   └── auth.ts               # Authentication middleware
└── utils/
    └── validation.ts         # Shared utilities
```

The file name convention `index.get.ts` tells Nuxt both the HTTP method and the path. Clean and intuitive.

## Your First Endpoint

Let's start with a simple GET endpoint:

```typescript
// server/api/articles/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const articles = await getArticles({ page, limit });

  return {
    success: true,
    articles,
    total: articles.length,
    page,
    limit,
  };
});
```

`defineEventHandler` is the core primitive. It receives an `event` object (from H3, Nitro's HTTP framework) and can return any serializable value.

## Request Validation

Never trust user input. Here's a pattern using Zod for runtime validation:

```typescript
// server/utils/validation.ts
import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(3).max(200),
  markdown: z.string().min(10),
  tags: z.array(z.string()).max(5),
  description: z.string().max(500).optional(),
  status: z.enum(['draft', 'published']).default('draft'),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
```

Then use it in your POST handler:

```typescript
// server/api/articles/index.post.ts
import { createArticleSchema } from '../../utils/validation';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate input
  const result = createArticleSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Validation failed',
      data: result.error.flatten(),
    });
  }

  const article = await saveArticle(result.data);

  return { success: true, slug: article.slug };
});
```

## Authentication Middleware

Protect routes with server middleware:

```typescript
// server/middleware/auth.ts
import { verifyToken } from '../utils/auth';

export default defineEventHandler(async (event) => {
  // Only protect /api/admin/* routes
  const path = getRequestURL(event).pathname;
  if (!path.startsWith('/api/admin')) return;

  const token = getCookie(event, 'auth_token');
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Authentication required',
    });
  }

  try {
    const payload = verifyToken(token);
    event.context.auth = payload;
  } catch {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired token',
    });
  }
});
```

The middleware runs **before** your route handlers. By attaching the user data to `event.context.auth`, downstream handlers can access it easily.

## Error Handling

Nuxt/Nitro has built-in error handling with `createError`:

```typescript
// Throw structured errors
throw createError({
  statusCode: 404,
  message: 'Article not found',
});

// With additional data
throw createError({
  statusCode: 422,
  message: 'Validation failed',
  data: { field: 'title', error: 'Too short' },
});
```

These automatically get serialized into proper HTTP responses with the correct status code.

## Dynamic Route Parameters

Use bracket syntax for dynamic segments:

```typescript
// server/api/articles/[slug].get.ts
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required' });
  }

  const article = await getArticleBySlug(slug);

  if (!article) {
    throw createError({ statusCode: 404, message: 'Article not found' });
  }

  return { success: true, article };
});
```

## Best Practices

### 1. Separate Concerns

Keep your route handlers thin. Move business logic to utility functions:

```typescript
// ✅ Good: handler is just a thin controller
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const article = await getArticleBySlug(slug);
  return { success: true, article };
});

// ❌ Bad: business logic in the handler
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const files = await readdir('./content');
  const file = files.find(f => f === `${slug}.md`);
  const raw = await readFile(`./content/${file}`, 'utf-8');
  // ... parsing, transforming, etc.
});
```

### 2. Use TypeScript

Type your responses for end-to-end safety:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### 3. Handle Edge Cases

Always validate parameters, handle missing data gracefully, and return meaningful error messages:

```typescript
if (!slug || typeof slug !== 'string') {
  throw createError({ statusCode: 400, message: 'Invalid slug' });
}
```

## Conclusion

Nuxt 4's server routes give you everything you need to build a robust API:

- **File-based routing** — intuitive and organized
- **Built-in middleware** — authentication, logging, etc.
- **H3 utilities** — `getQuery`, `readBody`, `getCookie`, etc.
- **TypeScript support** — full type safety out of the box
- **Auto-imports** — `defineEventHandler`, `createError`, etc.

The best part? Your API deploys alongside your frontend, on any platform Nitro supports — from Node.js to Cloudflare Workers to Vercel Edge Functions.

Build full-stack, ship faster. 🛠️
