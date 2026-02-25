<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <!-- Loading -->
        <div v-if="pending" class="animate-pulse">
            <div class="flex flex-col items-center mb-12">
                <div class="size-24 rounded-full bg-slate-200 dark:bg-slate-700 mb-4"></div>
                <div class="h-6 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div class="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div v-for="i in 3" :key="i"
                    class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 h-64 animate-pulse">
                </div>
            </div>
        </div>

        <!-- Not Found -->
        <div v-else-if="error || !author" class="text-center py-20">
            <div
                class="size-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span class="material-symbols-outlined text-slate-400" style="font-size: 32px;">person_off</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ $t('authors.not_found') }}</h2>
            <p class="text-sm text-slate-500 mb-6">{{ $t('authors.not_found_desc') }}</p>
            <NuxtLink :to="localePath('/authors')"
                class="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all">
                <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
                {{ $t('authors.back_to_authors') }}
            </NuxtLink>
        </div>

        <template v-else>
            <!-- Back Button -->
            <NuxtLink :to="localePath('/authors')"
                class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors mb-8">
                <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
                {{ $t('authors.back_to_authors') }}
            </NuxtLink>

            <!-- Author Profile Card -->
            <div
                class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 mb-10">
                <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <!-- Avatar -->
                    <div
                        class="size-24 sm:size-28 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-xl shadow-primary/20 shrink-0">
                        {{ author.name?.charAt(0)?.toUpperCase() || '?' }}
                    </div>

                    <!-- Info -->
                    <div class="flex-1 text-center sm:text-left">
                        <h1 class="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mb-1">
                            {{ author.name }}
                        </h1>
                        <p class="text-slate-500 dark:text-slate-400 mb-4">@{{ author.username }}</p>

                        <!-- Stats Row -->
                        <div class="flex flex-wrap justify-center sm:justify-start gap-4 mb-4">
                            <div class="flex items-center gap-1.5">
                                <span class="material-symbols-outlined text-primary"
                                    style="font-size: 20px;">article</span>
                                <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {{ totalArticles }} {{ totalArticles === 1 ? $t('authors.article') :
                                        $t('authors.articles_count') }}
                                </span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span class="material-symbols-outlined text-amber-500"
                                    style="font-size: 20px;">calendar_today</span>
                                <span class="text-sm text-slate-500">
                                    {{ $t('authors.joined', { date: formatDate(author.createdAt) }) }}
                                </span>
                            </div>
                        </div>

                        <!-- Role Badge -->
                        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium capitalize"
                            :class="author.role === 'admin'
                                ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                                : 'bg-primary/10 text-primary'">
                            <span class="material-symbols-outlined" style="font-size: 14px;">
                                {{ author.role === 'admin' ? 'shield' : 'edit_note' }}
                            </span>
                            {{ author.role }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Articles Section -->
            <div>
                <h2 class="text-xl font-bold font-serif text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary" style="font-size: 24px;">library_books</span>
                    {{ $t('authors.articles_by', { name: author.name?.split(' ')[0] }) }}
                </h2>

                <!-- Articles Grid -->
                <div v-if="articles.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
                </div>

                <!-- No Articles -->
                <div v-else
                    class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center">
                    <div
                        class="size-14 mx-auto mb-3 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                        <span class="material-symbols-outlined text-slate-300 dark:text-slate-600"
                            style="font-size: 28px;">edit_note</span>
                    </div>
                    <h3 class="font-semibold text-slate-900 dark:text-white mb-1">{{ $t('authors.no_articles') }}</h3>
                    <p class="text-sm text-slate-500">{{ $t('authors.no_articles_desc') }}</p>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const authorId = route.params.id as string

const { data, pending, error } = await useFetch<{ success: boolean; author: any; articles: any[]; totalArticles: number }>(`/api/authors/${authorId}`)

const author = computed(() => data.value?.author)
const articles = computed(() => data.value?.articles || [])
const totalArticles = computed(() => data.value?.totalArticles || 0)

useHead({
    title: computed(() => author.value ? `${author.value.name} — Naradev` : 'Author — Naradev'),
})
useSeoMeta({
    title: computed(() => author.value?.name || 'Author'),
    description: computed(() => author.value ? t('authors.seo_desc', { name: author.value.name, count: totalArticles.value }) : ''),
    ogTitle: computed(() => author.value?.name || 'Author'),
    ogDescription: computed(() => author.value ? t('authors.seo_desc', { name: author.value.name, count: totalArticles.value }) : ''),
    ogImage: '/logo.png',
    ogType: 'profile',
    twitterCard: 'summary_large_image',
})

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(locale.value === 'id' ? 'id-ID' : 'en-US', {
        month: 'long',
        year: 'numeric',
    })
}
</script>
