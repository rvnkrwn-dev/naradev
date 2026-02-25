<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <!-- Header -->
        <div class="mb-10 text-center">
            <span
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
                <span class="material-symbols-outlined" style="font-size: 16px;">sell</span>
                {{ $t('tags.badge') }}
            </span>
            <h1 class="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white mb-3">{{
                $t('tags.title') }}</h1>
            <p class="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                {{ $t('tags.subtitle') }}
            </p>
        </div>

        <!-- Search -->
        <div class="max-w-md mx-auto mb-10">
            <div class="relative">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    style="font-size: 20px;">search</span>
                <input v-model="searchQuery" type="text" :placeholder="$t('tags.search_placeholder')"
                    class="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm" />
            </div>
        </div>

        <!-- Loading -->
        <div v-if="pending" class="flex flex-wrap justify-center gap-3">
            <div v-for="i in 12" :key="i" class="h-10 w-24 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse">
            </div>
        </div>

        <!-- Tags Grid -->
        <div v-else-if="filteredTags.length"
            class="flex flex-wrap justify-center items-start content-start gap-3 min-h-[40vh]">
            <NuxtLink v-for="tag in filteredTags" :key="tag.name"
                :to="localePath(`/articles?tag=${encodeURIComponent(tag.name)}`)"
                class="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 dark:hover:border-primary dark:hover:bg-primary/10 transition-all duration-200 shadow-sm hover:shadow-md">
                <span class="text-primary font-semibold text-sm">#</span>
                <span
                    class="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">{{
                        tag.name }}</span>
                <span class="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{{
                    tag.count }}</span>
            </NuxtLink>
        </div>

        <!-- Empty -->
        <div v-else class="flex flex-col items-center justify-center min-h-[40vh]">
            <div
                class="size-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span class="material-symbols-outlined text-slate-400" style="font-size: 32px;">sell</span>
            </div>
            <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">{{ $t('tags.empty_title') }}</h3>
            <p class="text-sm text-slate-500">
                {{ searchQuery ? $t('tags.empty_description_search') : $t('tags.empty_description') }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({ title: t('seo.tags.title') })
useSeoMeta({ title: t('seo.tags.title'), description: t('seo.tags.description') })

const searchQuery = ref('')

const { data, pending } = await useFetch('/api/articles', {
    query: { limit: 100 },
})

const allTags = computed(() => {
    const tagMap = new Map<string, number>()
    const articles = data.value?.articles || []
    articles.forEach((article: any) => {
        article.tags?.forEach((tag: string) => {
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
        })
    })
    return Array.from(tagMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
})

const filteredTags = computed(() => {
    if (!searchQuery.value) return allTags.value
    const q = searchQuery.value.toLowerCase()
    return allTags.value.filter(t => t.name.toLowerCase().includes(q))
})
</script>
