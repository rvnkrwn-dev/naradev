<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <!-- Header -->
        <div class="mb-10 text-center">
            <span
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
                <span class="material-symbols-outlined" style="font-size: 16px;">group</span>
                {{ $t('authors.badge') }}
            </span>
            <h1 class="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white mb-3">{{
                $t('authors.title') }}</h1>
            <p class="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                {{ $t('authors.subtitle') }}
            </p>
        </div>

        <!-- Search -->
        <div class="max-w-md mx-auto mb-10">
            <div class="relative">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    style="font-size: 20px;">search</span>
                <input v-model="searchQuery" type="text" :placeholder="$t('authors.search_placeholder')"
                    class="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm" />
            </div>
        </div>

        <!-- Loading -->
        <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="i in 6" :key="i"
                class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 animate-pulse">
                <div class="flex items-center gap-4">
                    <div class="size-14 rounded-full bg-slate-100 dark:bg-slate-700"></div>
                    <div class="flex-1">
                        <div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-24 mb-2"></div>
                        <div class="h-3 bg-slate-100 dark:bg-slate-700 rounded w-16"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Authors Grid -->
        <div v-else-if="filteredAuthors.length"
            class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[40vh] content-start">
            <NuxtLink v-for="author in filteredAuthors" :key="author.id"
                :to="localePath(`/articles?authorId=${author.id}`)"
                class="group bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div class="flex items-center gap-4">
                    <div
                        class="size-14 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-lg font-bold text-white shadow-md shadow-primary/20 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {{ author.name?.charAt(0)?.toUpperCase() || '?' }}
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3
                            class="text-base font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                            {{ author.name }}
                        </h3>
                        <p class="text-sm text-slate-500 truncate">@{{ author.username }}</p>
                    </div>
                </div>
                <div
                    class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium capitalize"
                        :class="author.role === 'admin'
                            ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                            : 'bg-primary/10 text-primary'">
                        <span class="material-symbols-outlined" style="font-size: 14px;">
                            {{ author.role === 'admin' ? 'shield' : 'edit_note' }}
                        </span>
                        {{ author.role }}
                    </span>
                    <span class="text-xs text-slate-400 flex items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 14px;">calendar_today</span>
                        {{ $t('authors.joined', { date: formatDate(author.createdAt) }) }}
                    </span>
                </div>
            </NuxtLink>
        </div>

        <!-- Empty -->
        <div v-else class="flex flex-col items-center justify-center min-h-[40vh]">
            <div
                class="size-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span class="material-symbols-outlined text-slate-400" style="font-size: 32px;">group</span>
            </div>
            <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">{{ $t('authors.empty_title') }}</h3>
            <p class="text-sm text-slate-500 mb-6">{{ $t('authors.empty_description') }}</p>
            <NuxtLink :to="localePath('/register')"
                class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25">
                <span class="material-symbols-outlined" style="font-size: 18px;">person_add</span>
                {{ $t('authors.empty_cta') }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useHead({ title: t('seo.authors.title') })
useSeoMeta({
    title: t('seo.authors.title'),
    description: t('seo.authors.description'),
    ogTitle: t('seo.authors.title'),
    ogDescription: t('seo.authors.description'),
    ogImage: '/logo.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('seo.authors.title'),
    twitterDescription: t('seo.authors.description'),
    twitterImage: '/logo.png',
})

const { data, pending } = await useFetch<{ success: boolean; authors: any[] }>('/api/authors')

const searchQuery = ref('')
const authors = computed(() => data.value?.authors || [])

const filteredAuthors = computed(() => {
    if (!searchQuery.value) return authors.value
    const q = searchQuery.value.toLowerCase()
    return authors.value.filter((a: any) =>
        a.name?.toLowerCase().includes(q) || a.username?.toLowerCase().includes(q)
    )
})

const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString(locale.value === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' })
}
</script>
