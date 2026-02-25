<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-28 overflow-hidden">
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl">
        </div>
      </div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-6">
          {{ $t('home.badge') }}
        </span>
        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-slate-900 dark:text-white leading-tight mb-6">
          {{ $t('home.hero_title_1') }}
          <span class="text-primary relative inline-block">
            {{ $t('home.hero_title_2') }}
            <svg class="absolute w-full h-3 -bottom-1 left-0 text-primary/20" fill="none" viewBox="0 0 200 9"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M2.00025 6.99997C25.7501 9.76162 159.638 12.3363 200.002 2.00007" stroke="currentColor"
                stroke-width="3" />
            </svg>
          </span>
        </h1>
        <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          {{ $t('home.hero_description') }}
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink :to="localePath('/articles')"
            class="w-full sm:w-auto h-12 px-8 rounded-xl bg-primary text-white text-base font-semibold hover:bg-primary-dark transition-colors shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
            {{ $t('home.cta_explore') }}
            <span class="material-symbols-outlined" style="font-size: 20px;">arrow_forward</span>
          </NuxtLink>
          <NuxtLink :to="localePath(isAuthenticated ? '/dashboard/create' : '/register')"
            class="w-full sm:w-auto h-12 px-8 rounded-xl bg-white border border-slate-200 text-slate-900 text-base font-semibold hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined" style="font-size: 20px;">edit_square</span>
            {{ $t('home.cta_write') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Articles Grid -->
    <section class="py-16 bg-white dark:bg-background-dark/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">verified</span>
            {{ $t('home.featured_title') }}
          </h2>
          <NuxtLink :to="localePath('/articles')"
            class="text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1">
            {{ $t('common.view_all') }} <span class="material-symbols-outlined"
              style="font-size: 16px;">arrow_forward</span>
          </NuxtLink>
        </div>

        <!-- Loading -->
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="card animate-pulse">
            <div class="aspect-video bg-slate-200 dark:bg-slate-800"></div>
            <div class="p-6 space-y-3">
              <div class="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
              <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Articles Grid -->
        <div v-else-if="articles.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="article in featuredArticles" :key="article.slug"
            class="group flex flex-col h-full bg-background-light dark:bg-slate-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-slate-100 dark:border-slate-800">
            <NuxtLink :to="localePath(`/articles/${article.slug}`)" class="contents">
              <!-- Image Area -->
              <div
                class="relative aspect-[16/10] sm:aspect-video overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <template v-if="article.cover">
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/10 z-10 transition-opacity duration-500">
                  </div>
                  <img :src="article.cover" :alt="locale === 'id' ? article.title_id : article.title_en"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </template>
                <template v-else>
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                  <div class="w-full h-full bg-gradient-to-br group-hover:scale-105 transition-transform duration-500"
                    :class="getCardGradient(article.slug)"></div>
                </template>
                <span v-if="article.tags?.length"
                  class="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg text-white text-xs font-bold backdrop-blur-md bg-white/10 border border-white/20 shadow-sm"
                  :class="getTagColor(article.tags[0])">
                  {{ article.tags[0] }}
                </span>
              </div>
              <!-- Content -->
              <div class="flex flex-col flex-1 p-6">
                <h3
                  class="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {{ locale === 'id' ? article.title_id : article.title_en }}
                </h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
                  {{ (locale === 'id' ? article.description_id : article.description_en) || $t('home.no_description') }}
                </p>
                <div class="flex items-center gap-3 mt-auto">
                  <div
                    class="size-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {{ article.author?.name?.charAt(0)?.toUpperCase() || '?' }}
                  </div>
                  <div class="text-xs">
                    <p class="font-semibold text-slate-900 dark:text-white">{{ article.author?.name ||
                      $t('home.anonymous') }}
                    </p>
                    <p class="text-slate-500">{{ formatDate(article.date) }}</p>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 mb-4 block"
            style="font-size: 64px;">draft</span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ $t('home.empty_title') }}</h3>
          <p class="text-slate-500 mb-6">{{ $t('home.empty_description') }}</p>
          <NuxtLink :to="localePath(isAuthenticated ? '/dashboard/create' : '/register')" class="btn-primary">
            <span class="material-symbols-outlined" style="font-size: 18px;">edit_square</span>
            {{ $t('home.cta_write') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Latest Articles & Tags Layout -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-12">

          <!-- Main Content: Latest Articles List -->
          <div class="lg:w-2/3">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-8">{{ $t('home.latest_title') }}</h2>
            <div v-if="articles.length" class="flex flex-col gap-8">
              <NuxtLink v-for="(article, idx) in articles" :key="'list-' + article.slug"
                :to="localePath(`/articles/${article.slug}`)"
                class="flex flex-col sm:flex-row gap-6 group cursor-pointer">
                <div v-if="!article.cover"
                  class="w-full sm:w-48 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shrink-0"
                  :class="getCardGradient(article.slug)"></div>
                <img v-else :src="article.cover" :alt="locale === 'id' ? article.title_id : article.title_en"
                  class="w-full sm:w-48 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shrink-0 object-cover" />
                <div :class="[
                  'flex flex-col justify-center w-full',
                  idx < articles.length - 1 ? 'border-b border-slate-200 dark:border-slate-800 pb-8' : ''
                ]">
                  <div class="flex items-center gap-2 mb-2">
                    <span v-if="article.tags?.length" class="text-xs font-bold text-primary uppercase tracking-wider">{{
                      article.tags[0] }}</span>
                    <span class="text-slate-400">·</span>
                    <span class="text-xs text-slate-500">{{ formatDate(article.date) }}</span>
                  </div>
                  <h3
                    class="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {{ locale === 'id' ? article.title_id : article.title_en }}
                  </h3>
                  <p class="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-3">
                    {{ (locale === 'id' ? article.description_id : article.description_en) || $t('home.no_description')
                    }}
                  </p>
                  <div class="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                    <span>{{ $t('home.read_more') }}</span>
                    <span
                      class="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
            <div v-else class="text-center py-12 text-slate-500">
              <p>{{ $t('home.latest_empty') }}</p>
            </div>
          </div>

          <!-- Sidebar: Popular Tags & Newsletter -->
          <div class="lg:w-1/3 flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
            <!-- Popular Tags -->
            <div
              class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">{{ $t('home.sidebar_popular_tags') }}
              </h3>
              <div v-if="allTags.length" class="flex flex-wrap gap-2">
                <NuxtLink v-for="tag in allTags" :key="tag" :to="localePath(`/articles?tag=${tag}`)"
                  class="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                  {{ tag }}
                </NuxtLink>
              </div>
              <p v-else class="text-sm text-slate-500">{{ $t('home.sidebar_no_tags') }}</p>
            </div>

            <!-- Newsletter -->
            <div class="bg-primary p-6 rounded-2xl text-white shadow-xl shadow-primary/20 relative overflow-hidden">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div class="relative z-10">
                <h3 class="text-xl font-bold mb-2">{{ $t('home.newsletter_title') }}</h3>
                <p class="text-primary-light text-sm mb-4">{{ $t('home.newsletter_description') }}</p>
                <form @submit.prevent class="flex flex-col gap-3">
                  <input type="email" :placeholder="$t('home.newsletter_placeholder')"
                    class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 text-sm" />
                  <button type="button"
                    class="w-full py-3 rounded-xl bg-white text-primary font-bold text-sm hover:bg-primary-light transition-colors">
                    {{ $t('home.newsletter_cta') }}
                  </button>
                </form>
                <p class="text-xs text-primary-light/60 mt-3 text-center">{{ $t('home.newsletter_disclaimer') }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { isAuthenticated } = useAuth()
const { fetchArticles } = useArticles()

const { data, pending } = await useAsyncData('home-articles', () =>
  fetchArticles({ limit: 6 })
)

const articles = computed(() => data.value?.articles || [])
const featuredArticles = computed(() => articles.value.slice(0, 3))

const allTags = computed(() => {
  const tags = new Set<string>()
  articles.value.forEach((a: any) => {
    a.tags?.forEach((t: string) => tags.add(t))
  })
  return Array.from(tags)
})

const gradients = [
  'from-blue-500/30 via-indigo-500/20 to-purple-500/10',
  'from-emerald-500/30 via-teal-500/20 to-cyan-500/10',
  'from-sky-500/30 via-blue-500/20 to-indigo-500/10',
  'from-rose-500/30 via-pink-500/20 to-fuchsia-500/10',
  'from-amber-500/30 via-orange-500/20 to-yellow-500/10',
  'from-violet-500/30 via-purple-500/20 to-indigo-500/10',
]

const getCardGradient = (slug: string) => {
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return `bg-gradient-to-br ${gradients[hash % gradients.length]}`
}

const tagColors: Record<string, string> = {
  typescript: 'bg-blue-600/90',
  javascript: 'bg-yellow-500/90',
  nuxt: 'bg-emerald-500/90',
  vue: 'bg-emerald-600/90',
  react: 'bg-sky-500/90',
  css: 'bg-pink-500/90',
  devops: 'bg-orange-500/90',
  security: 'bg-red-500/90',
}

const getTagColor = (tag: string) => {
  return tagColors[tag.toLowerCase()] || 'bg-primary/90'
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString(locale.value === 'id' ? 'id-ID' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

useHead({ title: t('seo.home.title') })
useSeoMeta({ title: t('seo.home.title'), description: t('seo.home.description') })
</script>
