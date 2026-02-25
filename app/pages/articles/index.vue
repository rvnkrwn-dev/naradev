<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white mb-2">{{ $t('articles.title')
        }}</h1>
      <p class="text-slate-500 dark:text-slate-400">{{ $t('articles.subtitle') }}</p>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row gap-3 mb-8">
      <div class="relative flex-1">
        <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          style="font-size: 18px;">search</span>
        <input v-model="searchQuery" type="text"
          class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm"
          :placeholder="$t('articles.search_placeholder')" @input="debouncedSearch" />
      </div>

      <!-- Tags Dropdown -->
      <div class="relative" ref="tagDropdownRef">
        <button @click="tagDropdownOpen = !tagDropdownOpen"
          class="inline-flex items-center gap-2 py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors sm:w-48 w-full"
          :class="{ 'border-primary ring-2 ring-primary/40': tagDropdownOpen }">
          <span class="material-symbols-outlined text-slate-400" style="font-size: 18px;">sell</span>
          <span class="flex-1 text-left truncate">
            {{ selectedTags.length ? selectedTags.length + ' tag' + (selectedTags.length > 1 ? 's' : '') + ' ' +
              $t('articles.filter_selected') :
              $t('articles.filter_all_tags') }}
          </span>
          <svg class="size-4 text-slate-400 transition-transform duration-200"
            :class="{ 'rotate-180': tagDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <Transition enter-active-class="transition duration-150 ease-out"
          leave-active-class="transition duration-100 ease-in" enter-from-class="opacity-0 translate-y-1 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100" leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-1 scale-95">
          <div v-if="tagDropdownOpen"
            class="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-200 dark:border-slate-800 z-30 overflow-hidden">
            <div class="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{{ $t('articles.filter_label')
                }}</span>
              <button v-if="selectedTags.length" @click="clearAllTags"
                class="text-xs font-medium text-primary hover:text-primary-dark transition-colors">
                {{ $t('common.clear_all') }}
              </button>
            </div>
            <div class="max-h-56 overflow-y-auto py-1">
              <label v-for="tag in allAvailableTags" :key="tag"
                class="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                <input type="checkbox" :value="tag" v-model="selectedTags"
                  class="size-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/40 bg-white dark:bg-slate-800" />
                <span class="text-sm text-slate-700 dark:text-slate-300 flex-1">#{{ tag }}</span>
                <span class="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">
                  {{ tagCounts[tag] || 0 }}
                </span>
              </label>
            </div>
            <div class="px-3 py-2.5 border-t border-slate-100 dark:border-slate-800">
              <button @click="applyTagFilter"
                class="w-full py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors">
                {{ $t('articles.filter_apply') }}
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Sort Dropdown -->
      <div class="relative" ref="sortDropdownRef">
        <button @click="sortDropdownOpen = !sortDropdownOpen"
          class="inline-flex items-center gap-2 py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors sm:w-48 w-full"
          :class="{ 'border-primary ring-2 ring-primary/40': sortDropdownOpen }">
          <span class="material-symbols-outlined text-slate-400" style="font-size: 18px;">sort</span>
          <span class="flex-1 text-left truncate">
            {{ sortBy === 'popular' ? $t('articles.sort_popular') : $t('articles.sort_latest') }}
          </span>
          <svg class="size-4 text-slate-400 transition-transform duration-200"
            :class="{ 'rotate-180': sortDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <Transition enter-active-class="transition duration-150 ease-out"
          leave-active-class="transition duration-100 ease-in" enter-from-class="opacity-0 translate-y-1 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100" leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-1 scale-95">
          <div v-if="sortDropdownOpen"
            class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-200 dark:border-slate-800 z-30 overflow-hidden">
            <div class="py-1">
              <button @click="applySort('latest')"
                class="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                :class="{ 'text-primary font-semibold bg-primary/5 dark:bg-primary/10': sortBy !== 'popular' }">
                {{ $t('articles.sort_latest') }}
              </button>
              <button @click="applySort('popular')"
                class="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                :class="{ 'text-primary font-semibold bg-primary/5 dark:bg-primary/10': sortBy === 'popular' }">
                {{ $t('articles.sort_popular') }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Active Filters -->
    <div v-if="appliedTags.length || sortBy" class="mb-6 flex flex-wrap items-center gap-2">
      <span class="text-sm text-slate-500">{{ $t('articles.filter_active') }}</span>
      <span v-for="tag in appliedTags" :key="tag"
        class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
        #{{ tag }}
        <button @click="removeTag(tag)" class="hover:text-primary-dark">&times;</button>
      </span>
      <span v-if="sortBy"
        class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
        {{ sortBy === 'latest' ? $t('articles.sort_latest') : sortBy === 'popular' ? $t('articles.sort_popular') :
          sortBy }}
        <button @click="sortBy = ''; applyTagFilter()" class="hover:text-primary">&times;</button>
      </span>
      <button v-if="appliedTags.length > 1" @click="clearAllFilters"
        class="text-xs font-medium text-slate-500 hover:text-primary ml-1 transition-colors">
        {{ $t('common.clear_all') }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="i in 6" :key="i"
        class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 animate-pulse">
        <div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
        <div class="h-5 bg-slate-100 dark:bg-slate-700 rounded w-full mb-2"></div>
        <div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-2/3 mb-4"></div>
        <div class="h-3 bg-slate-100 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Articles Grid -->
    <div v-else-if="filteredArticles.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <ArticleCard v-for="article in paginatedArticles" :key="article.slug" :article="article" />
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-16">
      <div class="size-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <span class="material-symbols-outlined text-slate-400" style="font-size: 32px;">article</span>
      </div>
      <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">{{ $t('articles.empty_title') }}</h3>
      <p class="text-sm text-slate-500">
        {{ searchQuery || appliedTags.length ? $t('articles.empty_description_search') :
          $t('articles.empty_description') }}
      </p>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-center gap-3 mt-10">
      <button :disabled="page <= 1" @click="page--"
        class="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        <span class="material-symbols-outlined" style="font-size: 18px;">chevron_left</span>
        {{ $t('common.prev') }}
      </button>

      <span class="text-sm text-slate-500 px-4">
        {{ $t('common.pagination', { current: page, total: totalPages }) }}
      </span>

      <button :disabled="page >= totalPages" @click="page++"
        class="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        {{ $t('common.next') }}
        <span class="material-symbols-outlined" style="font-size: 18px;">chevron_right</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({ title: t('seo.articles.title') })
useSeoMeta({
  title: t('seo.articles.title'),
  description: t('seo.articles.description'),
  ogTitle: t('seo.articles.title'),
  ogDescription: t('seo.articles.description'),
  ogImage: '/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: t('seo.articles.title'),
  twitterDescription: t('seo.articles.description'),
  twitterImage: '/logo.png',
})

const route = useRoute()
const searchQuery = ref((route.query.q as string) || '')
const sortBy = ref((route.query.sort as string) || '')
const page = ref(1)
const limit = 9

const initialTag = (route.query.tag as string) || ''
const selectedTags = ref<string[]>(initialTag ? [initialTag] : [])
const appliedTags = ref<string[]>(initialTag ? [initialTag] : [])
const tagDropdownOpen = ref(false)
const tagDropdownRef = ref<HTMLElement | null>(null)
const sortDropdownOpen = ref(false)
const sortDropdownRef = ref<HTMLElement | null>(null)

watch(() => route.query, (q) => {
  if (q.q !== undefined && q.q !== searchQuery.value) searchQuery.value = q.q as string
  if (q.tag !== undefined) {
    const tag = q.tag as string
    if (tag && !appliedTags.value.includes(tag)) {
      appliedTags.value = [tag]
      selectedTags.value = [tag]
    }
  }
  if (q.sort !== undefined && q.sort !== sortBy.value) sortBy.value = q.sort as string
  page.value = 1
}, { deep: true })

const { data, pending } = await useFetch('/api/articles', {
  query: { limit: 100 },
})

const allArticles = computed(() => data.value?.articles || [])

const allAvailableTags = computed(() => {
  const tags = new Set<string>()
  allArticles.value.forEach((a: any) => a.tags?.forEach((t: string) => tags.add(t)))
  return Array.from(tags).sort()
})

const tagCounts = computed(() => {
  const counts: Record<string, number> = {}
  allArticles.value.forEach((a: any) => {
    a.tags?.forEach((t: string) => {
      counts[t] = (counts[t] || 0) + 1
    })
  })
  return counts
})

const filteredArticles = computed(() => {
  let result = allArticles.value as any[]

  // 1. Text Search Filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((a: any) =>
      a.title_id?.toLowerCase().includes(q) ||
      a.title_en?.toLowerCase().includes(q) ||
      a.description_id?.toLowerCase().includes(q) ||
      a.description_en?.toLowerCase().includes(q) ||
      a.author?.name?.toLowerCase().includes(q)
    )
  }

  // 2. Tag Filter
  if (appliedTags.value.length) {
    const lowerTags = appliedTags.value.map(t => t.toLowerCase())
    result = result.filter((a: any) =>
      lowerTags.every(tag => a.tags?.some((t: string) => t.toLowerCase() === tag))
    )
  }

  // 3. Sort
  if (sortBy.value === 'popular') {
    result = [...result].sort((a: any, b: any) => (b.stats?.views || 0) - (a.stats?.views || 0))
  } else {
    result = [...result].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  return result
})

const totalPages = computed(() => Math.ceil(filteredArticles.value.length / limit))
const paginatedArticles = computed(() => {
  const start = (page.value - 1) * limit
  return filteredArticles.value.slice(start, start + limit)
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
function handleClickOutside(e: MouseEvent) {
  if (tagDropdownRef.value && !tagDropdownRef.value.contains(e.target as Node)) {
    tagDropdownOpen.value = false
  }
  if (sortDropdownRef.value && !sortDropdownRef.value.contains(e.target as Node)) {
    sortDropdownOpen.value = false
  }
}

const applySort = (sort: string) => {
  sortBy.value = sort
  sortDropdownOpen.value = false
  page.value = 1
}

let searchTimeout: ReturnType<typeof setTimeout>
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 1
  }, 400)
}

const applyTagFilter = () => {
  appliedTags.value = [...selectedTags.value]
  tagDropdownOpen.value = false
  page.value = 1
}

const removeTag = (tag: string) => {
  appliedTags.value = appliedTags.value.filter(t => t !== tag)
  selectedTags.value = selectedTags.value.filter(t => t !== tag)
  page.value = 1
}

const clearAllTags = () => {
  selectedTags.value = []
  appliedTags.value = []
  page.value = 1
}

const clearAllFilters = () => {
  selectedTags.value = []
  appliedTags.value = []
  sortBy.value = ''
  searchQuery.value = ''
  page.value = 1
}
</script>
