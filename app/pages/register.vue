<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-16 sm:py-24">
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl">
      </div>
    </div>

    <div class="w-full max-w-md">
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 p-8 sm:p-10">
        <div class="text-center mb-8">
          <div
            class="size-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined text-white" style="font-size: 28px;">person_add</span>
          </div>
          <h1 class="text-2xl font-bold font-serif text-slate-900 dark:text-white">{{ $t('auth.register.title') }}</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">{{ $t('auth.register.subtitle') }}</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <label for="username" class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{{
              $t('auth.register.username_label') }}</label>
            <input id="username" v-model="form.username" type="text"
              class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
              :placeholder="$t('auth.register.username_placeholder')" required autocomplete="username" />
          </div>

          <div>
            <label for="name" class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{{
              $t('auth.register.name_label') }}</label>
            <input id="name" v-model="form.name" type="text"
              class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
              :placeholder="$t('auth.register.name_placeholder')" required autocomplete="name" />
          </div>

          <div>
            <label for="email" class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{{
              $t('auth.register.email_label') }}</label>
            <input id="email" v-model="form.email" type="email"
              class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
              :placeholder="$t('auth.register.email_placeholder')" required autocomplete="email" />
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{{
              $t('auth.register.password_label') }}</label>
            <input id="password" v-model="form.password" type="password"
              class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
              :placeholder="$t('auth.register.password_placeholder')" required autocomplete="new-password" />
          </div>

          <button type="submit"
            class="w-full h-12 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            :disabled="loading">
            <svg v-if="loading" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? $t('common.processing') : $t('auth.register.submit') }}
          </button>

          <div v-if="errorMsg"
            class="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-2.5">
            <span class="material-symbols-outlined shrink-0 mt-0.5" style="font-size: 18px;">error</span>
            <span>{{ errorMsg }}</span>
          </div>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <p class="text-center text-sm text-slate-500 dark:text-slate-400">
            {{ $t('auth.register.has_account') }}
            <NuxtLink :to="localePath('/login')"
              class="text-primary hover:text-primary-dark font-semibold transition-colors ml-1">
              {{ $t('auth.register.login_link') }}</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({ middleware: 'guest' })
useHead({ title: t('seo.register.title') })

const { register } = useAuth()
const form = reactive({ username: '', name: '', email: '', password: '' })
const loading = ref(false)
const errorMsg = ref('')

const handleRegister = async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    await register(form)
    navigateTo('/dashboard')
  } catch (err: any) {
    const code = err?.data?.message
    errorMsg.value = code && t(`validation.${code}`) !== `validation.${code}`
      ? t(`validation.${code}`)
      : err?.data?.message || t('auth.register.error_default')
  } finally {
    loading.value = false
  }
}
</script>
