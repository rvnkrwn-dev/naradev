<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <!-- Welcome Header -->
    <div class="mb-10">
      <h1 class="text-3xl font-bold font-serif text-slate-900 dark:text-white">
        {{ $t('dashboard.welcome', { name: user?.name?.split(' ')[0] || $t('dashboard.default_name') }) }}
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mt-1">{{ $t('dashboard.subtitle') }}</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        <div class="flex items-center justify-between mb-3">
          <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary" style="font-size: 22px;">article</span>
          </div>
        </div>
        <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ totalArticles }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ $t('dashboard.stat_total') }}</p>
      </div>

      <div
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
        <div class="flex items-center justify-between mb-3">
          <div class="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400"
              style="font-size: 22px;">public</span>
          </div>
        </div>
        <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ publishedCount }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ $t('dashboard.stat_published') }}</p>
      </div>

      <div
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300">
        <div class="flex items-center justify-between mb-3">
          <div class="size-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-amber-600 dark:text-amber-400"
              style="font-size: 22px;">edit_note</span>
          </div>
        </div>
        <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ draftCount }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ $t('dashboard.stat_draft') }}</p>
      </div>

      <div
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
        <div class="flex items-center justify-between mb-3">
          <div class="size-10 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-violet-600 dark:text-violet-400"
              style="font-size: 22px;">sell</span>
          </div>
        </div>
        <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ uniqueTags }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ $t('dashboard.stat_tags') }}</p>
      </div>

      <!-- Total Views -->
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
        <div class="flex items-center justify-between mb-3">
          <div class="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400"
              style="font-size: 22px;">visibility</span>
          </div>
        </div>
        <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ totalViews }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ $t('dashboard.stat_views') }}</p>
      </div>

      <!-- Total Likes -->
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:shadow-pink-500/5 transition-all duration-300">
        <div class="flex items-center justify-between mb-3">
          <div class="size-10 rounded-xl bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-pink-600 dark:text-pink-400"
              style="font-size: 22px;">favorite</span>
          </div>
        </div>
        <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ totalLikes }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ $t('dashboard.stat_likes') }}</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
      <NuxtLink :to="localePath('/dashboard/create')"
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group flex items-center gap-4">
        <div
          class="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <span class="material-symbols-outlined text-primary" style="font-size: 24px;">edit_square</span>
        </div>
        <div>
          <p class="font-semibold text-slate-900 dark:text-white">{{ $t('dashboard.action_write') }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ $t('dashboard.action_write_desc') }}</p>
        </div>
      </NuxtLink>

      <NuxtLink :to="localePath('/dashboard/articles')"
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group flex items-center gap-4">
        <div
          class="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
          <span class="material-symbols-outlined text-slate-600 dark:text-slate-300"
            style="font-size: 24px;">list_alt</span>
        </div>
        <div>
          <p class="font-semibold text-slate-900 dark:text-white">{{ $t('dashboard.action_manage') }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ $t('dashboard.action_manage_desc') }}</p>
        </div>
      </NuxtLink>
    </div>

    <!-- Recent Articles -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white">{{ $t('dashboard.recent_title') }}</h2>
        <NuxtLink v-if="articles.length > 0" :to="localePath('/dashboard/articles')"
          class="text-sm text-primary font-medium hover:text-primary-dark transition-colors">
          {{ $t('dashboard.recent_view_all') }}
        </NuxtLink>
      </div>

      <div v-if="pending" class="space-y-3">
        <div v-for="i in 3" :key="i"
          class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 animate-pulse">
          <div class="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg w-2/3 mb-2" />
          <div class="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg w-1/3" />
        </div>
      </div>

      <div v-else-if="articles.length" class="space-y-3">
        <NuxtLink v-for="article in articles.slice(0, 5)" :key="article.slug"
          :to="localePath(`/dashboard/edit/${article.slug}`)"
          class="block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 p-4">
          <div class="flex items-center gap-3">
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-sm text-slate-900 dark:text-white truncate">{{ locale === 'id' ?
                article.title_id : article.title_en }}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {{ formatDate(article.date) }}
                <span v-if="article.tags?.length"> · {{ article.tags.slice(0, 3).join(', ') }}</span>
                <span v-if="article.stats"> · {{ article.stats.views }} view(s) · {{ article.stats.likes }}
                  like(s)</span>
              </p>
            </div>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold leading-4"
              :class="article.status === 'published'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30'
                : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30'">
              {{ article.status === 'published' ? $t('dashboard.status_published') : $t('dashboard.status_draft') }}
            </span>
            <span class="material-symbols-outlined text-slate-300 dark:text-slate-600"
              style="font-size: 18px;">chevron_right</span>
          </div>
        </NuxtLink>
      </div>

      <div v-else
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center">
        <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
          <span class="material-symbols-outlined text-slate-300 dark:text-slate-600"
            style="font-size: 28px;">edit_note</span>
        </div>
        <h3 class="font-semibold text-slate-900 dark:text-white mb-1">{{ $t('dashboard.empty_title') }}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">{{ $t('dashboard.empty_description') }}</p>
        <NuxtLink :to="localePath('/dashboard/create')"
          class="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
          {{ $t('dashboard.action_write') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

definePageMeta({ middleware: 'auth' })
useHead({ title: t('seo.dashboard.title') })

const { user } = useAuth()

const { data, pending } = await useFetch('/api/articles', {
  query: computed(() => ({
    limit: 50,
    status: 'all',
    authorId: user.value?.id,
  })),
})

const articles = computed(() => data.value?.articles || [])
const totalArticles = computed(() => articles.value.length)
const publishedCount = computed(() => articles.value.filter((a: any) => a.status === 'published').length)
const draftCount = computed(() => articles.value.filter((a: any) => a.status === 'draft').length)
const uniqueTags = computed(() => {
  const tags = new Set<string>()
  articles.value.forEach((a: any) => a.tags?.forEach((t: string) => tags.add(t)))
  return tags.size
})
const totalViews = computed(() => articles.value.reduce((sum: number, a: any) => sum + (a.stats?.views || 0), 0))
const totalLikes = computed(() => articles.value.reduce((sum: number, a: any) => sum + (a.stats?.likes || 0), 0))


function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
