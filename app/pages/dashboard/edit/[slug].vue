<template>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <!-- Loading -->
        <div v-if="pending" class="animate-pulse space-y-6">
            <div class="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
            <div class="h-10 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div class="h-10 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div class="h-40 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>

        <!-- Error -->
        <div v-else-if="error || !article"
            class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
            <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 mb-4 block"
                style="font-size: 48px;">search_off</span>
            <h2 class="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-2">{{
                $t('dashboard.edit_not_found') }}</h2>
            <p class="text-slate-500 mb-6">{{ $t('dashboard.edit_not_found_desc') }}</p>
            <NuxtLink :to="localePath('/dashboard')"
                class="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors">
                <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
                {{ $t('dashboard.back') }}
            </NuxtLink>
        </div>

        <!-- Form -->
        <template v-else>
            <div class="mb-8">
                <NuxtLink :to="localePath('/dashboard')"
                    class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors mb-4 group">
                    <span class="material-symbols-outlined group-hover:-translate-x-0.5 transition-transform"
                        style="font-size: 18px;">arrow_back</span>
                    {{ $t('dashboard.back') }}
                </NuxtLink>
                <h1 class="text-3xl font-bold font-serif text-slate-900 dark:text-white">{{ $t('dashboard.edit_title')
                    }}</h1>
                <p class="text-slate-500 dark:text-slate-400 mt-1">{{ article.title_id }}</p>
            </div>

            <ArticleForm :initial-data="{
                title_id: article.title_id,
                title_en: article.title_en,
                slug: article.slug,
                description_id: article.description_id,
                description_en: article.description_en,
                tags: article.tags,
                status: article.status,
                markdown_id: article.markdown_id,
                markdown_en: article.markdown_en,
                cover: article.cover,
            }" :submit-label="$t('dashboard.edit_submit')" @submit="handleUpdate" />

            <div v-if="errorMsg"
                class="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-2.5">
                <span class="material-symbols-outlined shrink-0 mt-0.5" style="font-size: 18px;">error</span>
                <span>{{ errorMsg }}</span>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const slug = route.params.slug as string

const { data, pending, error } = await useFetch(`/api/articles/${slug}`)
const article = computed(() => data.value?.article)

useHead({ title: computed(() => article.value ? `${t('dashboard.edit_title')}: ${article.value.title_id} — Indigo` : t('dashboard.edit_title')) })

const { updateArticle } = useArticles()
const errorMsg = ref('')

const handleUpdate = async (formData: any) => {
    errorMsg.value = ''
    try {
        await updateArticle(slug, formData)
        navigateTo(`/articles/${slug}`)
    } catch (err: any) {
        errorMsg.value = err?.data?.message || t('dashboard.edit_error')
    }
}
</script>
