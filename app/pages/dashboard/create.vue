<template>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div class="mb-8">
            <NuxtLink :to="localePath('/dashboard')"
                class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors mb-4 group">
                <span class="material-symbols-outlined group-hover:-translate-x-0.5 transition-transform"
                    style="font-size: 18px;">arrow_back</span>
                {{ $t('dashboard.back') }}
            </NuxtLink>
            <h1 class="text-3xl font-bold font-serif text-slate-900 dark:text-white">{{ $t('dashboard.create_title') }}
            </h1>
            <p class="text-slate-500 dark:text-slate-400 mt-1">{{ $t('dashboard.create_subtitle') }}</p>
        </div>

        <ArticleForm :submit-label="$t('dashboard.create_submit')" @submit="handleCreate" />

        <div v-if="errorMsg"
            class="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-2.5">
            <span class="material-symbols-outlined shrink-0 mt-0.5" style="font-size: 18px;">error</span>
            <span>{{ errorMsg }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({ middleware: 'auth' })
useHead({ title: t('seo.dashboard_create.title') })

const { createArticle } = useArticles()
const errorMsg = ref('')

const handleCreate = async (data: any) => {
    errorMsg.value = ''
    try {
        const result = await createArticle(data)
        navigateTo(`/articles/${result.slug}`)
    } catch (err: any) {
        errorMsg.value = err?.data?.message || t('dashboard.create_error')
    }
}
</script>
