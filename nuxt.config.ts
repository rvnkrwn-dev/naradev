// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxtjs/sitemap'],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'default-secret-change-me',
    cookieName: process.env.COOKIE_NAME || 'web_article_token',
    githubToken: process.env.GITHUB_TOKEN || '',
    githubOwner: process.env.GITHUB_OWNER || '',
    githubRepo: process.env.GITHUB_REPO || '',
    githubBranch: process.env.GITHUB_BRANCH || 'main',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
  },

  site: {
    url: 'https://naradev.id', // Change to your actual domain
    name: 'Naradev',
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
    // Options specific to i18n
    sitemaps: true,
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  i18n: {
    locales: [
      { code: 'id', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'id',
    langDir: '../locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'en',
    },
  },

  app: {
    head: {
      title: 'Naradev',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Serif:wght@400;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' },
      ],
    },
  },
})
