<template>
    <div>
        <!-- Hero -->
        <section class="relative py-20 lg:py-28 overflow-hidden">
            <div class="absolute inset-0 -z-10">
                <div
                    class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-3xl">
                </div>
            </div>
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-6">
                    <span class="material-symbols-outlined" style="font-size: 16px;">info</span>
                    {{ $t('about.badge') }}
                </span>
                <h1
                    class="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight mb-6">
                    {{ $t('about.hero_title_1') }}
                    <span class="text-primary">{{ $t('about.hero_title_2') }}</span>
                </h1>
                <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    {{ $t('about.hero_description') }}
                </p>
            </div>
        </section>

        <!-- Features -->
        <section class="py-16 lg:py-20 bg-slate-50/50 dark:bg-slate-900/50">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-2xl md:text-3xl font-bold font-serif text-slate-900 dark:text-white mb-3">{{
                        $t('about.features_title') }}</h2>
                    <p class="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                        {{ $t('about.features_description') }}
                    </p>
                </div>

                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="feature in features" :key="feature.titleKey"
                        class="bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <div class="size-12 rounded-xl flex items-center justify-center mb-4" :class="feature.iconBg">
                            <span class="material-symbols-outlined" :class="feature.iconColor"
                                style="font-size: 24px;">{{ feature.icon }}</span>
                        </div>
                        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">{{ $t(feature.titleKey) }}
                        </h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{{ $t(feature.descKey) }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tech Stack -->
        <section class="py-16 lg:py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-2xl md:text-3xl font-bold font-serif text-slate-900 dark:text-white mb-3">{{
                    $t('about.tech_title') }}</h2>
                <p class="text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-10">
                    {{ $t('about.tech_description') }}
                </p>

                <div class="flex flex-wrap justify-center gap-3">
                    <span v-for="tech in techStack" :key="tech"
                        class="inline-flex items-center px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {{ tech }}
                    </span>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-16 lg:py-20 bg-slate-50/50 dark:bg-slate-900/50">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-2xl md:text-3xl font-bold font-serif text-slate-900 dark:text-white mb-4">{{
                    $t('about.cta_title') }}</h2>
                <p class="text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-8">
                    {{ $t('about.cta_description') }}
                </p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <NuxtLink :to="localePath('/register')"
                        class="w-full sm:w-auto h-12 px-8 rounded-xl bg-primary text-white text-base font-semibold hover:bg-primary-dark transition-colors shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                        {{ $t('about.cta_button') }}
                        <span class="material-symbols-outlined" style="font-size: 20px;">arrow_forward</span>
                    </NuxtLink>
                    <NuxtLink :to="localePath('/articles')"
                        class="w-full sm:w-auto h-12 px-8 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-base font-semibold hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                        {{ $t('about.cta_browse') }}
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({ title: t('seo.about.title') })
useSeoMeta({
    title: t('seo.about.title'),
    description: t('seo.about.description'),
    ogTitle: t('seo.about.title'),
    ogDescription: t('seo.about.description'),
    ogImage: '/logo.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('seo.about.title'),
    twitterDescription: t('seo.about.description'),
    twitterImage: '/logo.png',
})

const features = [
    { icon: 'edit_note', iconBg: 'bg-primary/10', iconColor: 'text-primary', titleKey: 'about.feature_1_title', descKey: 'about.feature_1_desc' },
    { icon: 'sell', iconBg: 'bg-violet-50 dark:bg-violet-900/20', iconColor: 'text-violet-600 dark:text-violet-400', titleKey: 'about.feature_2_title', descKey: 'about.feature_2_desc' },
    { icon: 'shield', iconBg: 'bg-emerald-50 dark:bg-emerald-900/20', iconColor: 'text-emerald-600 dark:text-emerald-400', titleKey: 'about.feature_3_title', descKey: 'about.feature_3_desc' },
    { icon: 'devices', iconBg: 'bg-sky-50 dark:bg-sky-900/20', iconColor: 'text-sky-600 dark:text-sky-400', titleKey: 'about.feature_4_title', descKey: 'about.feature_4_desc' },
    { icon: 'dark_mode', iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-600 dark:text-amber-400', titleKey: 'about.feature_5_title', descKey: 'about.feature_5_desc' },
    { icon: 'speed', iconBg: 'bg-rose-50 dark:bg-rose-900/20', iconColor: 'text-rose-600 dark:text-rose-400', titleKey: 'about.feature_6_title', descKey: 'about.feature_6_desc' },
]

const techStack = ['Nuxt 4', 'Vue 3', 'Tailwind CSS', 'TypeScript', 'JWT Auth', 'Markdown', 'SSR']
</script>
