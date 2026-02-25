<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <!-- Header -->
        <div class="mb-10">
            <h1 class="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white mb-2">
                {{ $t('reading_list.title') }}
            </h1>
            <p class="text-slate-500 dark:text-slate-400">{{ $t('reading_list.subtitle') }}</p>
        </div>

        <!-- Not Authenticated -->
        <div v-if="!isAuthenticated" class="text-center py-16">
            <div
                class="size-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span class="material-symbols-outlined text-slate-400" style="font-size: 32px;">lock</span>
            </div>
            <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                {{ $t('reading_list.login_required_title') }}
            </h3>
            <p class="text-sm text-slate-500 mb-4">{{ $t('reading_list.login_required_desc') }}</p>
            <NuxtLink :to="localePath('/login')"
                class="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                {{ $t('nav.login') }}
            </NuxtLink>
        </div>

        <!-- Loading -->
        <div v-else-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="i in 3" :key="i"
                class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 animate-pulse">
                <div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
                <div class="h-5 bg-slate-100 dark:bg-slate-700 rounded w-full mb-2"></div>
                <div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-2/3 mb-4"></div>
                <div class="h-3 bg-slate-100 dark:bg-slate-700 rounded w-1/2"></div>
            </div>
        </div>

        <!-- Articles Grid -->
        <div v-else-if="articles.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="article in articles" :key="article.slug" class="relative group">
                <ArticleCard :article="article" />
                <!-- Remove from reading list -->
                <button @click.prevent="handleToggle(article.slug)"
                    class="absolute top-3 right-3 z-10 size-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100"
                    :title="$t('reading_list.remove')">
                    <span class="material-symbols-outlined" style="font-size: 18px;">bookmark_remove</span>
                </button>
            </div>
        </div>

        <!-- Empty -->
        <div v-else class="text-center py-16">
            <div
                class="size-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span class="material-symbols-outlined text-slate-400" style="font-size: 32px;">bookmark</span>
            </div>
            <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                {{ $t('reading_list.empty_title') }}
            </h3>
            <p class="text-sm text-slate-500 mb-4">{{ $t('reading_list.empty_desc') }}</p>
            <NuxtLink :to="localePath('/articles')"
                class="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                {{ $t('reading_list.browse_articles') }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { isAuthenticated } = useAuth()

useHead({ title: t('seo.reading_list.title') })
useSeoMeta({ title: t('seo.reading_list.title'), description: t('seo.reading_list.description') })

const { data, pending, refresh } = await useFetch('/api/readinglist', {
    immediate: isAuthenticated.value,
})

const articles = computed(() => data.value?.articles || [])

async function handleToggle(slug: string) {
    try {
        await $fetch(`/api/readinglist/${slug}`, { method: 'POST' })
        await refresh()
    } catch { }
}
</script>
