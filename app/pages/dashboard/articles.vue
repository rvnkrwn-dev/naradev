<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
                <h1 class="text-3xl font-bold font-serif text-slate-900 dark:text-white">{{
                    $t('dashboard.my_articles_title') }}</h1>
                <p class="text-slate-500 dark:text-slate-400 mt-1">{{ $t('dashboard.my_articles_subtitle') }}</p>
            </div>
            <NuxtLink :to="localePath('/dashboard/create')"
                class="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
                <span class="material-symbols-outlined" style="font-size: 18px;">add</span>
                {{ $t('dashboard.action_write') }}
            </NuxtLink>
        </div>

        <!-- Loading -->
        <div v-if="pending" class="space-y-4">
            <div v-for="i in 3" :key="i"
                class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 animate-pulse flex items-center gap-4">
                <div class="h-5 bg-slate-100 dark:bg-slate-800 rounded-lg flex-1" />
                <div class="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg w-20" />
            </div>
        </div>

        <!-- Articles List -->
        <div v-else-if="articles?.length" class="space-y-3">
            <div v-for="article in articles" :key="article.slug"
                class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                        <h3 class="font-semibold text-slate-900 dark:text-white truncate">{{ locale === 'id' ?
                            article.title_id : article.title_en }}</h3>
                        <span
                            class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold leading-4"
                            :class="article.status === 'published'
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30'
                                : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30'">
                            {{ article.status === 'published' ? $t('dashboard.status_published') :
                                $t('dashboard.status_draft') }}
                        </span>
                    </div>
                    <p class="text-xs text-slate-400 dark:text-slate-500 truncate mb-0.5">
                        {{ locale === 'id' ? article.title_en : article.title_id }}
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">
                        {{ formatDate(article.date) }}
                        <span v-if="article.tags?.length"> · {{ article.tags.join(', ') }}</span>
                    </p>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <NuxtLink :to="localePath(`/articles/${article.slug}`)"
                        class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        target="_blank">
                        <span class="material-symbols-outlined" style="font-size: 16px;">visibility</span>
                        {{ $t('dashboard.article_view') }}
                    </NuxtLink>
                    <NuxtLink :to="localePath(`/dashboard/edit/${article.slug}`)"
                        class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span class="material-symbols-outlined" style="font-size: 16px;">edit</span>
                        {{ $t('dashboard.article_edit') }}
                    </NuxtLink>
                    <button @click="handleDelete(article.slug, article)"
                        class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors cursor-pointer">
                        <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
                        {{ $t('dashboard.article_delete') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Empty -->
        <div v-else
            class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
            <div
                class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                <span class="material-symbols-outlined text-slate-300 dark:text-slate-600"
                    style="font-size: 32px;">edit_note</span>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-1">{{ $t('dashboard.empty_title') }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">{{ $t('dashboard.empty_description') }}</p>
            <NuxtLink :to="localePath('/dashboard/create')"
                class="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                {{ $t('dashboard.action_write') }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

definePageMeta({ middleware: 'auth' })
useHead({ title: t('seo.dashboard_articles.title') })

const { user } = useAuth()
const { deleteArticle } = useArticles()

const { data, pending, refresh } = await useFetch('/api/articles', {
    query: computed(() => ({
        limit: 50,
        status: 'all',
        authorId: user.value?.id,
    })),
})

const articles = computed(() => data.value?.articles || [])

const handleDelete = async (slug: string, article: any) => {
    if (!confirm(t('dashboard.delete_confirm', { title: article.title_id }))) return
    try {
        await deleteArticle(slug)
        refresh()
    } catch (err: any) {
        alert(err?.data?.message || t('dashboard.delete_error'))
    }
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(locale.value === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}
</script>
