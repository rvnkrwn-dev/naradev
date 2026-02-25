<template>
  <div>
    <!-- Loading -->
    <div v-if="pending" class="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 animate-pulse space-y-6">
      <div class="h-4 bg-slate-100 dark:bg-slate-800 rounded w-24"></div>
      <div class="h-10 bg-slate-100 dark:bg-slate-800 rounded w-2/3"></div>
      <div class="h-5 bg-slate-100 dark:bg-slate-800 rounded w-1/3"></div>
      <div class="space-y-3 mt-8">
        <div v-for="i in 8" :key="i" class="h-4 bg-slate-100 dark:bg-slate-800 rounded"
          :class="i % 3 === 0 ? 'w-3/4' : 'w-full'"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
      <div class="size-20 mx-auto mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <span class="material-symbols-outlined text-slate-400" style="font-size: 40px;">search_off</span>
      </div>
      <h2 class="text-2xl font-bold font-serif text-slate-800 dark:text-white mb-2">{{ $t('article.not_found_title') }}
      </h2>
      <p class="text-slate-500 dark:text-slate-400 mb-8">{{ $t('article.not_found_description') }}</p>
      <NuxtLink :to="localePath('/articles')"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25">
        <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
        {{ $t('article.back') }}
      </NuxtLink>
    </div>

    <!-- Article -->
    <article v-else-if="article">
      <!-- Hero Header -->
      <div class="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-background-dark pb-8">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16">
          <NuxtLink :to="localePath('/articles')"
            class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors mb-8 group">
            <span class="material-symbols-outlined group-hover:-translate-x-0.5 transition-transform"
              style="font-size: 18px;">arrow_back</span>
            {{ $t('article.back') }}
          </NuxtLink>

          <div v-if="article.tags?.length" class="flex flex-wrap gap-2 mb-5">
            <NuxtLink v-for="tag in article.tags" :key="tag"
              :to="localePath(`/articles?tag=${encodeURIComponent(tag)}`)"
              class="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors">
              #{{ tag }}
            </NuxtLink>
          </div>

          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-slate-900 dark:text-white leading-tight mb-6">
            {{ localizedTitle }}
          </h1>

          <p v-if="localizedDescription" class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
            {{ localizedDescription }}
          </p>

          <div class="flex flex-wrap items-center gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
            <NuxtLink v-if="article.author" :to="localePath(`/articles?authorId=${article.author.id}`)"
              class="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div
                class="size-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-sm font-bold text-white shadow-md shadow-primary/20">
                {{ article.author.name?.charAt(0)?.toUpperCase() || '?' }}
              </div>
              <div>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ article.author.name }}</p>
                <p class="text-xs text-slate-500">@{{ article.author.username }}</p>
              </div>
            </NuxtLink>
            <span v-else class="text-sm text-slate-500">{{ $t('article.unknown_author') }}</span>

            <span class="text-slate-300 dark:text-slate-700">·</span>

            <time class="text-sm text-slate-500 flex items-center gap-1.5" :datetime="article.date">
              <span class="material-symbols-outlined" style="font-size: 16px;">calendar_today</span>
              {{ formatDate(article.date) }}
            </time>

            <span v-if="readingTime" class="text-slate-300 dark:text-slate-700">·</span>
            <span v-if="readingTime" class="text-sm text-slate-500 flex items-center gap-1.5">
              <span class="material-symbols-outlined" style="font-size: 16px;">schedule</span>
              {{ $t('article.reading_time', { count: readingTime }) }}
            </span>

            <span class="text-slate-300 dark:text-slate-700">·</span>
            <span class="text-sm text-slate-500 flex items-center gap-1.5">
              <span class="material-symbols-outlined" style="font-size: 16px;">visibility</span>
              {{ article.stats?.views || 0 }}
            </span>

            <span class="text-slate-300 dark:text-slate-700">·</span>
            <span class="text-sm text-slate-500 flex items-center gap-1.5">
              <span class="material-symbols-outlined" style="font-size: 16px;">favorite</span>
              {{ article.stats?.likes || 0 }}
            </span>

            <span v-if="article.status === 'draft'"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 text-xs font-semibold">
              <span class="material-symbols-outlined" style="font-size: 14px;">edit_note</span>
              {{ $t('article.status_draft') }}
            </span>
          </div>

          <div v-if="article.cover"
            class="mt-8 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 aspect-[21/9] w-full">
            <img :src="article.cover" :alt="localizedTitle" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div class="prose prose-lg max-w-none dark:prose-invert
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
            prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-800 dark:prose-strong:text-slate-200
            prose-code:text-primary prose-code:bg-primary/5 prose-code:dark:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-slate-50 prose-pre:dark:bg-slate-900 prose-pre:border prose-pre:border-slate-200 prose-pre:dark:border-slate-800 prose-pre:rounded-2xl prose-pre:shadow-sm
            prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:dark:bg-primary/10 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:not-italic
            prose-img:rounded-2xl prose-img:border prose-img:border-slate-200 prose-img:dark:border-slate-800 prose-img:shadow-lg
            prose-li:text-slate-600 dark:prose-li:text-slate-300
            prose-hr:border-slate-200 prose-hr:dark:border-slate-800
            prose-th:text-slate-800 dark:prose-th:text-slate-200 prose-td:text-slate-600 dark:prose-td:text-slate-300"
          v-html="localizedHtml" />

        <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div v-if="article.author"
            class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-4">{{ $t('article.written_by') }}
            </p>
            <NuxtLink :to="localePath(`/articles?authorId=${article.author.id}`)"
              class="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div
                class="size-14 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-lg font-bold text-white shadow-md shadow-primary/20">
                {{ article.author.name?.charAt(0)?.toUpperCase() || '?' }}
              </div>
              <div>
                <p class="text-base font-semibold text-slate-900 dark:text-white">{{ article.author.name }}</p>
                <p class="text-sm text-slate-500">@{{ article.author.username }}</p>
              </div>
            </NuxtLink>
          </div>

          <div v-if="article.tags?.length" class="mt-6 flex flex-wrap items-center gap-2">
            <span class="text-sm text-slate-500 mr-1">{{ $t('article.tags_label') }}</span>
            <NuxtLink v-for="tag in article.tags" :key="tag"
              :to="localePath(`/articles?tag=${encodeURIComponent(tag)}`)"
              class="inline-flex items-center px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors">
              #{{ tag }}
            </NuxtLink>
          </div>

          <div class="mt-8 flex justify-center gap-3">
            <button @click="handleLike" :disabled="isLiking"
              class="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary transition-all shadow-sm"
              :class="{ 'text-primary border-primary bg-primary/5': hasLiked }">
              <span class="material-symbols-outlined" :class="{ 'fill-current text-primary': hasLiked }"
                style="font-size: 20px;">favorite</span>
              <span class="font-medium text-sm">{{ article.stats?.likes || 0 }} Likes</span>
            </button>
            <button @click="handleBookmark" :disabled="isBookmarking"
              class="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:text-amber-500 transition-all shadow-sm"
              :class="{ 'text-amber-500 border-amber-500 bg-amber-50 dark:bg-amber-900/20': isSaved }">
              <span class="material-symbols-outlined" style="font-size: 20px;">{{ isSaved ? 'bookmark' :
                'bookmark_border' }}</span>
              <span class="font-medium text-sm">{{ isSaved ? $t('reading_list.saved') : $t('reading_list.save')
                }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Related Articles -->
      <div v-if="relatedArticles.length"
        class="border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-1">{{
                $t('article.related_title') }}</h2>
              <p class="text-sm text-slate-500">{{ $t('article.related_subtitle') }}</p>
            </div>
            <NuxtLink :to="localePath('/articles')"
              class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              {{ $t('common.view_all') }}
              <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
            </NuxtLink>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ArticleCard v-for="related in relatedArticles" :key="related.slug" :article="related" />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string

const { data, pending, error } = await useFetch(`/api/articles/${slug}`)
const article = ref(data.value?.article)

const { user, isAuthenticated } = useAuth()
const router = useRouter()

const isLiking = ref(false)
const hasLiked = computed(() => {
  if (!isAuthenticated.value || !user.value || !article.value?.stats?.likedBy) return false
  return article.value.stats.likedBy.includes(user.value.id)
})

const isSaved = ref(false)
const isBookmarking = ref(false)

onMounted(async () => {
  if (article.value) {
    // Track view per device
    const viewedKey = 'naradev_viewed_articles'
    const viewedArticles = JSON.parse(localStorage.getItem(viewedKey) || '[]')

    if (!viewedArticles.includes(slug)) {
      try {
        const res = await $fetch(`/api/articles/${slug}/view`, { method: 'POST' })
        if (res.stats) {
          article.value.stats = res.stats
          viewedArticles.push(slug)
          localStorage.setItem(viewedKey, JSON.stringify(viewedArticles))
        }
      } catch { }
    }
  }

  // Check if article is in reading list
  if (isAuthenticated.value) {
    try {
      const res = await $fetch('/api/readinglist')
      if (res.articles) {
        isSaved.value = res.articles.some((a: any) => a.slug === slug)
      }
    } catch { }
  }
})

async function handleLike() {
  if (!isAuthenticated.value) {
    router.push(localePath('/login'))
    return
  }

  if (!article.value || isLiking.value) return
  isLiking.value = true

  try {
    const res = await $fetch(`/api/articles/${slug}/like`, { method: 'POST' })
    if (res.stats) {
      article.value.stats = res.stats
    }
  } catch { } finally {
    isLiking.value = false
  }
}

async function handleBookmark() {
  if (!isAuthenticated.value) {
    router.push(localePath('/login'))
    return
  }
  if (isBookmarking.value) return
  isBookmarking.value = true
  try {
    const res = await $fetch(`/api/readinglist/${slug}`, { method: 'POST' })
    isSaved.value = !!res.saved
  } catch { } finally {
    isBookmarking.value = false
  }
}

const localizedTitle = computed(() => {
  if (!article.value) return ''
  if (locale.value === 'id') {
    return article.value.title_id || article.value.title_en || ''
  }
  return article.value.title_en || article.value.title_id || ''
})

const localizedDescription = computed(() => {
  if (!article.value) return ''
  if (locale.value === 'id') {
    return article.value.description_id || article.value.description_en || ''
  }
  return article.value.description_en || article.value.description_id || ''
})

const localizedHtml = computed(() => {
  if (!article.value) return ''
  if (locale.value === 'id') {
    return article.value.html_id || article.value.html_en || ''
  }
  return article.value.html_en || article.value.html_id || ''
})

const readingTime = computed(() => {
  if (!localizedHtml.value) return 0
  const text = localizedHtml.value.replace(/<[^>]+>/g, '')
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
})

const { data: relatedData } = await useFetch('/api/articles', {
  query: { limit: 20 },
})

const relatedArticles = computed(() => {
  if (!article.value?.tags?.length) return []
  const all = relatedData.value?.articles || []
  const currentTags = new Set(article.value.tags.map((t: string) => t.toLowerCase()))
  return all
    .filter((a: any) => a.slug !== slug && a.tags?.some((t: string) => currentTags.has(t.toLowerCase())))
    .slice(0, 3)
})

useHead({
  title: computed(() => localizedTitle.value ? `${localizedTitle.value} — Naradev` : 'Article — Naradev'),
  script: computed(() => {
    if (!article.value) return []
    return [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: localizedTitle.value,
        description: localizedDescription.value,
        image: article.value.cover ? [article.value.cover] : [],
        datePublished: article.value.date,
        dateModified: article.value.date,
        author: {
          '@type': 'Person',
          name: article.value.author?.name || 'Naradev Author',
          url: `${useRuntimeConfig().public.appUrl}/authors/${article.value.author?.id}`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Naradev',
          logo: {
            '@type': 'ImageObject',
            url: `${useRuntimeConfig().public.appUrl}/logo.png`
          }
        }
      })
    }]
  })
})
useSeoMeta({
  title: computed(() => localizedTitle.value || 'Article'),
  description: computed(() => localizedDescription.value || ''),
  ogTitle: computed(() => localizedTitle.value || 'Article'),
  ogDescription: computed(() => localizedDescription.value || ''),
  ogImage: computed(() => article.value?.cover || '/logo.png'),
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => localizedTitle.value || 'Article'),
  twitterDescription: computed(() => localizedDescription.value || ''),
  twitterImage: computed(() => article.value?.cover || '/logo.png'),
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
