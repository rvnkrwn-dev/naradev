<template>
  <footer class="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Brand Column -->
        <div class="flex flex-col gap-4">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
            <div class="size-6 bg-primary rounded-md flex items-center justify-center text-white">
              <svg class="size-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="2" />
              </svg>
            </div>
            <span class="font-bold text-lg text-slate-900 dark:text-white">Naradev</span>
          </NuxtLink>
          <p class="text-slate-500 text-sm leading-relaxed">
            {{ $t('footer.description') }}
          </p>
        </div>
        <!-- Links Column 1 -->
        <div class="flex flex-col gap-4">
          <h4 class="font-bold text-slate-900 dark:text-white">{{ $t('footer.platform') }}</h4>
          <ul class="flex flex-col gap-2">
            <li>
              <NuxtLink :to="localePath('/articles')"
                class="text-slate-500 hover:text-primary text-sm transition-colors">{{ $t('footer.latest_articles') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/tags')" class="text-slate-500 hover:text-primary text-sm transition-colors">{{
                $t('footer.popular_tags') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/authors')"
                class="text-slate-500 hover:text-primary text-sm transition-colors">{{ $t('footer.authors') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <!-- Links Column 2 -->
        <div class="flex flex-col gap-4">
          <h4 class="font-bold text-slate-900 dark:text-white">{{ $t('footer.account') }}</h4>
          <ul class="flex flex-col gap-2">
            <li>
              <NuxtLink :to="localePath('/login')" class="text-slate-500 hover:text-primary text-sm transition-colors">
                {{ $t('footer.login') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/register')"
                class="text-slate-500 hover:text-primary text-sm transition-colors">{{ $t('footer.register') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <!-- Socials Column -->
        <div class="flex flex-col gap-4">
          <h4 class="font-bold text-slate-900 dark:text-white">{{ $t('footer.follow') }}</h4>
          <div class="flex gap-4">
            <a class="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all"
              href="#" aria-label="Twitter">
              <svg aria-hidden="true" class="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a class="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all"
              href="#" aria-label="GitHub">
              <svg aria-hidden="true" class="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a class="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all"
              href="#" aria-label="Dribbble">
              <svg aria-hidden="true" class="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.753 1.003-1.83 2.41-2.423 3.12-2.515.302-5.566 1.554-6.904 2.661-.875-1.595-1.346-3.411-1.446-5.325.024-.009.05-.017.076-.025.2.144.408.28.628.411zm1.181 6.556c1.425-1.112 4.417-2.327 6.842-2.628.983 2.72 1.444 5.414 1.517 5.86-2.52.887-5.367.65-7.576-1.127zm10.707 1.436c-.059-.47-.53-3.103-1.503-5.875 2.585-.694 5.385-.75 5.842-.74a8.618 8.618 0 01-4.339 6.615z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div
        class="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-slate-400">{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
        <div class="flex gap-6">
          <a class="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" href="#">{{
            $t('footer.privacy') }}</a>
          <a class="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" href="#">{{
            $t('footer.cookies') }}</a>
          <a class="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" href="#">{{
            $t('footer.accessibility') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
