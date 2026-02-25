<template>
  <NuxtLink :to="localePath(`/articles/${article.slug}`)" class="card-hover group flex flex-col h-full overflow-hidden">
    <!-- Cover Image -->
    <div v-if="article.cover"
      class="aspect-[16/10] w-full overflow-hidden border-b border-slate-100 dark:border-slate-800">
      <img :src="article.cover" :alt="localizedTitle"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>

    <div class="p-5 sm:p-6 flex flex-col flex-grow">
      <!-- Tags -->
      <div v-if="article.tags?.length" class="flex flex-wrap gap-1.5 mb-3">
        <TagBadge v-for="tag in article.tags.slice(0, 3)" :key="tag" :tag="tag" size="sm" no-link />
      </div>

      <!-- Title -->
      <h3
        class="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-2 mb-2">
        {{ localizedTitle }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
        {{ localizedDescription }}
      </p>

      <!-- Meta -->
      <div class="flex items-center justify-between mt-auto pt-2">
        <AuthorBadge v-if="article.author" :author="article.author" size="sm" />
        <span v-else class="text-xs text-slate-500">{{ $t('article.unknown_author') }}</span>

        <div class="flex items-center gap-3">
          <div v-if="article.stats" class="flex items-center gap-2 text-xs text-slate-400">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined" style="font-size: 14px;">visibility</span>
              {{ article.stats.views }}
            </span>
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined" style="font-size: 14px;">favorite</span>
              {{ article.stats.likes }}
            </span>
          </div>
          <time class="text-xs text-slate-500" :datetime="article.date">
            {{ formatDate(article.date) }}
          </time>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
  article: {
    title_id?: string
    title_en?: string
    title?: string
    slug: string
    date: string
    description_id?: string
    description_en?: string
    description?: string
    tags: string[]
    cover?: string
    author: { id: string; username: string; name: string; role: string } | null
    stats?: { views: number; likes: number }
  }
}>()

const localizedTitle = computed(() => {
  if (locale.value === 'id') {
    return props.article.title_id || props.article.title || props.article.title_en || ''
  }
  return props.article.title_en || props.article.title || props.article.title_id || ''
})

const localizedDescription = computed(() => {
  if (locale.value === 'id') {
    return props.article.description_id || props.article.description || props.article.description_en || ''
  }
  return props.article.description_en || props.article.description || props.article.description_id || ''
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
