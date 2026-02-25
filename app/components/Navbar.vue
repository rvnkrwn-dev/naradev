<template>
    <header class="sticky top-0 z-50 w-full transition-all duration-300" :class="[
        mobileOpen
            ? 'bg-white dark:bg-background-dark shadow-sm'
            : scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-sm dark:bg-background-dark/80'
                : 'bg-white/60 backdrop-blur-md dark:bg-background-dark/60',
        'border-b border-slate-200/80 dark:border-slate-800/80'
    ]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 lg:h-20">

                <!-- Logo -->
                <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5 shrink-0 group" @click="closeAll">
                    <div
                        class="size-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105">
                        <svg class="size-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" />
                        </svg>
                    </div>
                    <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Naradev</span>
                </NuxtLink>

                <!-- Desktop Navigation -->
                <nav class="hidden lg:flex items-center gap-1">
                    <!-- Home -->
                    <NuxtLink :to="localePath('/')" class="nav-link" active-class="nav-link-active">
                        {{ $t('nav.home') }}
                    </NuxtLink>

                    <!-- Articles Dropdown -->
                    <div class="relative" ref="articlesDropdownRef">
                        <button @click="toggleDropdown('articles')" class="nav-link group"
                            :class="{ 'nav-link-active': activeDropdown === 'articles' || $route.path.startsWith('/articles') }">
                            {{ $t('nav.articles') }}
                            <svg class="size-4 ml-0.5 transition-transform duration-200"
                                :class="{ 'rotate-180': activeDropdown === 'articles' }" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <!-- Articles Dropdown Panel -->
                        <Transition enter-active-class="transition duration-200 ease-out"
                            leave-active-class="transition duration-150 ease-in"
                            enter-from-class="opacity-0 translate-y-2 scale-95"
                            enter-to-class="opacity-100 translate-y-0 scale-100"
                            leave-from-class="opacity-100 translate-y-0 scale-100"
                            leave-to-class="opacity-0 translate-y-2 scale-95">
                            <div v-if="activeDropdown === 'articles'"
                                class="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-800 p-2 origin-top">
                                <NuxtLink :to="localePath('/articles')" class="dropdown-item" @click="closeAll">
                                    <div class="dropdown-icon bg-primary/10 text-primary">
                                        <span class="material-symbols-outlined"
                                            style="font-size: 20px;">newspaper</span>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold text-slate-900 dark:text-white">{{
                                            $t('nav.all_articles') }}</p>
                                        <p class="text-xs text-slate-500 mt-0.5">{{ $t('nav.all_articles_desc') }}</p>
                                    </div>
                                </NuxtLink>
                                <NuxtLink :to="localePath('/articles?sort=latest')" class="dropdown-item"
                                    @click="closeAll">
                                    <div
                                        class="dropdown-icon bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                                        <span class="material-symbols-outlined" style="font-size: 20px;">schedule</span>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold text-slate-900 dark:text-white">{{
                                            $t('nav.latest') }}</p>
                                        <p class="text-xs text-slate-500 mt-0.5">{{ $t('nav.latest_desc') }}</p>
                                    </div>
                                </NuxtLink>
                                <NuxtLink :to="localePath('/articles?sort=popular')" class="dropdown-item"
                                    @click="closeAll">
                                    <div
                                        class="dropdown-icon bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                                        <span class="material-symbols-outlined"
                                            style="font-size: 20px;">trending_up</span>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold text-slate-900 dark:text-white">{{
                                            $t('nav.trending') }}</p>
                                        <p class="text-xs text-slate-500 mt-0.5">{{ $t('nav.trending_desc') }}</p>
                                    </div>
                                </NuxtLink>
                            </div>
                        </Transition>
                    </div>

                    <!-- Explore Dropdown -->
                    <div class="relative" ref="exploreDropdownRef">
                        <button @click="toggleDropdown('explore')" class="nav-link group"
                            :class="{ 'nav-link-active': activeDropdown === 'explore' }">
                            {{ $t('nav.explore') }}
                            <svg class="size-4 ml-0.5 transition-transform duration-200"
                                :class="{ 'rotate-180': activeDropdown === 'explore' }" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <!-- Explore Dropdown Panel -->
                        <Transition enter-active-class="transition duration-200 ease-out"
                            leave-active-class="transition duration-150 ease-in"
                            enter-from-class="opacity-0 translate-y-2 scale-95"
                            enter-to-class="opacity-100 translate-y-0 scale-100"
                            leave-from-class="opacity-100 translate-y-0 scale-100"
                            leave-to-class="opacity-0 translate-y-2 scale-95">
                            <div v-if="activeDropdown === 'explore'"
                                class="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-800 p-2 origin-top">
                                <NuxtLink :to="localePath('/tags')" class="dropdown-item" @click="closeAll">
                                    <div
                                        class="dropdown-icon bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400">
                                        <span class="material-symbols-outlined" style="font-size: 20px;">sell</span>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold text-slate-900 dark:text-white">{{
                                            $t('nav.tags') }}</p>
                                        <p class="text-xs text-slate-500 mt-0.5">{{ $t('nav.tags_desc') }}</p>
                                    </div>
                                </NuxtLink>
                                <NuxtLink :to="localePath('/authors')" class="dropdown-item" @click="closeAll">
                                    <div
                                        class="dropdown-icon bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400">
                                        <span class="material-symbols-outlined" style="font-size: 20px;">group</span>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold text-slate-900 dark:text-white">{{
                                            $t('nav.authors') }}</p>
                                        <p class="text-xs text-slate-500 mt-0.5">{{ $t('nav.authors_desc') }}</p>
                                    </div>
                                </NuxtLink>
                                <div class="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                                <NuxtLink :to="localePath('/dashboard')" class="dropdown-item" @click="closeAll">
                                    <div
                                        class="dropdown-icon bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400">
                                        <span class="material-symbols-outlined" style="font-size: 20px;">bookmark</span>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold text-slate-900 dark:text-white">{{
                                            $t('nav.reading_list') }}</p>
                                        <p class="text-xs text-slate-500 mt-0.5">{{ $t('nav.reading_list_desc') }}</p>
                                    </div>
                                </NuxtLink>
                            </div>
                        </Transition>
                    </div>

                    <NuxtLink :to="localePath('/about')" class="nav-link" active-class="nav-link-active">
                        {{ $t('nav.about') }}
                    </NuxtLink>

                    <!-- Write (visible when authenticated) -->
                    <NuxtLink v-if="isAuthenticated" :to="localePath('/dashboard/create')" class="nav-link"
                        active-class="nav-link-active">
                        <span class="material-symbols-outlined" style="font-size: 18px;">edit_square</span>
                        {{ $t('nav.write') }}
                    </NuxtLink>
                </nav>

                <!-- Desktop Right Actions -->
                <div class="hidden lg:flex items-center gap-3">
                    <!-- Search -->
                    <button @click="toggleSearch" class="action-btn"
                        :class="{ 'text-primary bg-primary/10': searchOpen }" :aria-label="$t('nav.toggle_search')">
                        <span class="material-symbols-outlined" style="font-size: 20px;">{{ searchOpen ? 'close' :
                            'search' }}</span>
                    </button>

                    <!-- Dark Mode Toggle -->
                    <button @click="toggleDarkMode" class="action-btn" :aria-label="$t('nav.toggle_dark_mode')">
                        <span class="material-symbols-outlined" style="font-size: 20px;">{{ isDark ? 'light_mode' :
                            'dark_mode' }}</span>
                    </button>

                    <!-- Locale Switcher -->
                    <button @click="switchLocale" class="action-btn" :aria-label="$t('nav.switch_language')">
                        <span class="material-symbols-outlined" style="font-size: 20px;">translate</span>
                    </button>

                    <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

                    <!-- Authenticated: Profile Dropdown -->
                    <template v-if="isAuthenticated">
                        <div class="relative" ref="profileDropdownRef">
                            <button @click="toggleDropdown('profile')" :aria-label="$t('nav.user_menu')"
                                class="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50 hover:shadow-sm transition-all duration-200">
                                <div
                                    class="size-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-xs font-bold text-white shadow-sm">
                                    {{ user?.name?.charAt(0)?.toUpperCase() || '?' }}
                                </div>
                                <svg class="size-4 text-slate-400 transition-transform duration-200"
                                    :class="{ 'rotate-180': activeDropdown === 'profile' }" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <!-- Profile Dropdown Panel -->
                            <Transition enter-active-class="transition duration-200 ease-out"
                                leave-active-class="transition duration-150 ease-in"
                                enter-from-class="opacity-0 translate-y-2 scale-95"
                                enter-to-class="opacity-100 translate-y-0 scale-100"
                                leave-from-class="opacity-100 translate-y-0 scale-100"
                                leave-to-class="opacity-0 translate-y-2 scale-95">
                                <div v-if="activeDropdown === 'profile'"
                                    class="absolute top-full right-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-800 overflow-hidden origin-top-right">
                                    <!-- User Info Header -->
                                    <div
                                        class="p-4 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 border-b border-slate-100 dark:border-slate-800">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="size-11 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-sm font-bold text-white shadow-md shadow-primary/20">
                                                {{ user?.name?.charAt(0)?.toUpperCase() || '?' }}
                                            </div>
                                            <div class="min-w-0">
                                                <p class="text-sm font-bold text-slate-900 dark:text-white truncate">{{
                                                    user?.name }}</p>
                                                <p class="text-xs text-slate-500 truncate">@{{ user?.username }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Menu Items -->
                                    <div class="p-2">
                                        <NuxtLink :to="localePath('/dashboard')" class="dropdown-item"
                                            @click="closeAll">
                                            <span class="material-symbols-outlined text-slate-400"
                                                style="font-size: 20px;">dashboard</span>
                                            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">{{
                                                $t('nav.dashboard') }}</span>
                                        </NuxtLink>
                                        <NuxtLink :to="localePath('/dashboard/create')" class="dropdown-item"
                                            @click="closeAll">
                                            <span class="material-symbols-outlined text-slate-400"
                                                style="font-size: 20px;">edit_square</span>
                                            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">{{
                                                $t('nav.write_article') }}</span>
                                        </NuxtLink>
                                        <NuxtLink :to="localePath('/dashboard/articles')" class="dropdown-item"
                                            @click="closeAll">
                                            <span class="material-symbols-outlined text-slate-400"
                                                style="font-size: 20px;">article</span>
                                            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">{{
                                                $t('nav.my_articles') }}</span>
                                        </NuxtLink>
                                    </div>

                                    <!-- Logout -->
                                    <div class="p-2 border-t border-slate-100 dark:border-slate-800">
                                        <button @click="handleLogout" class="dropdown-item w-full text-left">
                                            <span class="material-symbols-outlined text-red-400"
                                                style="font-size: 20px;">logout</span>
                                            <span class="text-sm font-medium text-red-500">{{ $t('nav.logout') }}</span>
                                        </button>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </template>

                    <!-- Guest: Login -->
                    <template v-else>
                        <NuxtLink :to="localePath('/login')"
                            class="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all duration-200 shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5">
                            {{ $t('nav.login') }}
                        </NuxtLink>
                    </template>
                </div>

                <!-- Mobile: Right Actions -->
                <div class="flex lg:hidden items-center gap-1.5">
                    <button @click="toggleSearch" class="action-btn"
                        :class="{ 'text-primary bg-primary/10': searchOpen }" :aria-label="$t('nav.toggle_search')">
                        <span class="material-symbols-outlined" style="font-size: 22px;">{{ searchOpen ? 'close' :
                            'search' }}</span>
                    </button>
                    <button @click="toggleDarkMode" class="action-btn" :aria-label="$t('nav.toggle_dark_mode')">
                        <span class="material-symbols-outlined" style="font-size: 22px;">{{ isDark ? 'light_mode' :
                            'dark_mode'
                            }}</span>
                    </button>
                    <button @click="switchLocale" class="action-btn" :aria-label="$t('nav.switch_language')">
                        <span class="material-symbols-outlined" style="font-size: 22px;">translate</span>
                    </button>
                    <button @click="mobileOpen = !mobileOpen" class="action-btn" :aria-label="$t('nav.toggle_menu')">
                        <span class="material-symbols-outlined" style="font-size: 24px;">{{ mobileOpen ? 'close' :
                            'menu' }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Search Bar Overlay -->
        <Transition enter-active-class="transition-all duration-200 ease-out"
            leave-active-class="transition-all duration-150 ease-in" enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2">
            <div v-if="searchOpen"
                class="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl">
                <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div class="relative">
                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            style="font-size: 22px;">search</span>
                        <input ref="searchInput" v-model="searchQuery" @keydown.enter="handleSearch"
                            @keydown.escape="searchOpen = false" type="text" :placeholder="$t('nav.search_placeholder')"
                            class="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm" />
                        <kbd
                            class="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-0.5 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-400 text-[10px] font-mono rounded-md border border-slate-200 dark:border-slate-600">
                            ESC
                        </kbd>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Mobile Menu -->
        <Transition enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0 -translate-y-4"
            leave-to-class="opacity-0 -translate-y-4">
            <div v-if="mobileOpen"
                class="lg:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-background-dark max-h-[calc(100vh-4rem)] overflow-y-auto">
                <div class="px-4 sm:px-6 py-4 space-y-1">

                    <!-- Nav Links -->
                    <NuxtLink :to="localePath('/')" class="mobile-nav-link" @click="closeAll">
                        <span class="material-symbols-outlined text-slate-400" style="font-size: 20px;">home</span>
                        {{ $t('nav.home') }}
                    </NuxtLink>

                    <!-- Mobile Articles Accordion -->
                    <div>
                        <button @click="mobileAccordion = mobileAccordion === 'articles' ? '' : 'articles'"
                            class="mobile-nav-link w-full justify-between">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-slate-400"
                                    style="font-size: 20px;">article</span>
                                {{ $t('nav.articles') }}
                            </div>
                            <svg class="size-4 text-slate-400 transition-transform duration-200"
                                :class="{ 'rotate-180': mobileAccordion === 'articles' }" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <Transition enter-active-class="transition-all duration-200 ease-out"
                            leave-active-class="transition-all duration-150 ease-in"
                            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-60"
                            leave-from-class="opacity-100 max-h-60" leave-to-class="opacity-0 max-h-0">
                            <div v-if="mobileAccordion === 'articles'" class="overflow-hidden ml-8 mt-1 space-y-1">
                                <NuxtLink :to="localePath('/articles')" class="mobile-sub-link" @click="closeAll">
                                    <span class="material-symbols-outlined" style="font-size: 18px;">newspaper</span>
                                    {{ $t('nav.all_articles') }}
                                </NuxtLink>
                                <NuxtLink :to="localePath('/articles?sort=latest')" class="mobile-sub-link"
                                    @click="closeAll">
                                    <span class="material-symbols-outlined" style="font-size: 18px;">schedule</span>
                                    {{ $t('nav.latest') }}
                                </NuxtLink>
                                <NuxtLink :to="localePath('/articles?sort=popular')" class="mobile-sub-link"
                                    @click="closeAll">
                                    <span class="material-symbols-outlined" style="font-size: 18px;">trending_up</span>
                                    {{ $t('nav.trending') }}
                                </NuxtLink>
                            </div>
                        </Transition>
                    </div>

                    <!-- Mobile Explore Accordion -->
                    <div>
                        <button @click="mobileAccordion = mobileAccordion === 'explore' ? '' : 'explore'"
                            class="mobile-nav-link w-full justify-between">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-slate-400"
                                    style="font-size: 20px;">explore</span>
                                {{ $t('nav.explore') }}
                            </div>
                            <svg class="size-4 text-slate-400 transition-transform duration-200"
                                :class="{ 'rotate-180': mobileAccordion === 'explore' }" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <Transition enter-active-class="transition-all duration-200 ease-out"
                            leave-active-class="transition-all duration-150 ease-in"
                            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-60"
                            leave-from-class="opacity-100 max-h-60" leave-to-class="opacity-0 max-h-0">
                            <div v-if="mobileAccordion === 'explore'" class="overflow-hidden ml-8 mt-1 space-y-1">
                                <NuxtLink :to="localePath('/tags')" class="mobile-sub-link" @click="closeAll">
                                    <span class="material-symbols-outlined" style="font-size: 18px;">sell</span>
                                    {{ $t('nav.tags') }}
                                </NuxtLink>
                                <NuxtLink :to="localePath('/authors')" class="mobile-sub-link" @click="closeAll">
                                    <span class="material-symbols-outlined" style="font-size: 18px;">group</span>
                                    {{ $t('nav.authors') }}
                                </NuxtLink>
                                <NuxtLink :to="localePath('/dashboard')" class="mobile-sub-link" @click="closeAll">
                                    <span class="material-symbols-outlined" style="font-size: 18px;">bookmark</span>
                                    {{ $t('nav.reading_list') }}
                                </NuxtLink>
                            </div>
                        </Transition>
                    </div>

                    <!-- About -->
                    <NuxtLink :to="localePath('/about')" class="mobile-nav-link" @click="closeAll">
                        <span class="material-symbols-outlined text-slate-400" style="font-size: 20px;">info</span>
                        {{ $t('nav.about') }}
                    </NuxtLink>

                    <template v-if="isAuthenticated">
                        <NuxtLink :to="localePath('/dashboard/create')" class="mobile-nav-link" @click="closeAll">
                            <span class="material-symbols-outlined text-slate-400"
                                style="font-size: 20px;">edit_square</span>
                            {{ $t('nav.write_article') }}
                        </NuxtLink>

                        <div class="border-t border-slate-100 dark:border-slate-800 my-3"></div>

                        <!-- User Info in Mobile -->
                        <div class="flex items-center gap-3 px-3 py-3">
                            <div
                                class="size-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-sm font-bold text-white shadow-md shadow-primary/20">
                                {{ user?.name?.charAt(0)?.toUpperCase() || '?' }}
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="text-sm font-bold text-slate-900 dark:text-white truncate">{{ user?.name }}
                                </p>
                                <p class="text-xs text-slate-500 truncate">@{{ user?.username }}</p>
                            </div>
                        </div>

                        <NuxtLink :to="localePath('/dashboard')" class="mobile-nav-link" @click="closeAll">
                            <span class="material-symbols-outlined text-slate-400"
                                style="font-size: 20px;">dashboard</span>
                            {{ $t('nav.dashboard') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('/dashboard/articles')" class="mobile-nav-link" @click="closeAll">
                            <span class="material-symbols-outlined text-slate-400"
                                style="font-size: 20px;">article</span>
                            {{ $t('nav.my_articles') }}
                        </NuxtLink>

                        <div class="border-t border-slate-100 dark:border-slate-800 my-3"></div>

                        <button @click="handleLogout"
                            class="mobile-nav-link w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
                            <span class="material-symbols-outlined" style="font-size: 20px;">logout</span>
                            {{ $t('nav.logout') }}
                        </button>
                    </template>

                    <!-- Guest Actions -->
                    <template v-else>
                        <div class="border-t border-slate-100 dark:border-slate-800 my-3"></div>
                        <div class="pt-1">
                            <NuxtLink :to="localePath('/login')"
                                class="flex items-center justify-center h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
                                @click="closeAll">
                                {{ $t('nav.login') }}
                            </NuxtLink>
                        </div>
                    </template>
                </div>
            </div>
        </Transition>
    </header>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const { user, isAuthenticated, logout } = useAuth()
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()

// State
const mobileOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const activeDropdown = ref<string | null>(null)
const mobileAccordion = ref('')
const scrolled = ref(false)
const isDark = ref(false)

// Refs for click-outside
const articlesDropdownRef = ref<HTMLElement | null>(null)
const exploreDropdownRef = ref<HTMLElement | null>(null)
const profileDropdownRef = ref<HTMLElement | null>(null)

// Scroll detection
onMounted(() => {
    // Check initial dark mode
    isDark.value = document.documentElement.classList.contains('dark')

    const onScroll = () => {
        scrolled.value = window.scrollY > 10
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', onScroll))

    // Click outside to close dropdowns
    document.addEventListener('click', handleClickOutside)
    onUnmounted(() => document.removeEventListener('click', handleClickOutside))
})

// Close dropdowns on route change
watch(() => route.fullPath, () => {
    closeAll()
})

const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node
    if (
        activeDropdown.value === 'articles' &&
        articlesDropdownRef.value &&
        !articlesDropdownRef.value.contains(target)
    ) {
        activeDropdown.value = null
    }
    if (
        activeDropdown.value === 'explore' &&
        exploreDropdownRef.value &&
        !exploreDropdownRef.value.contains(target)
    ) {
        activeDropdown.value = null
    }
    if (
        activeDropdown.value === 'profile' &&
        profileDropdownRef.value &&
        !profileDropdownRef.value.contains(target)
    ) {
        activeDropdown.value = null
    }
}

const toggleDropdown = (name: string) => {
    activeDropdown.value = activeDropdown.value === name ? null : name
}

const toggleSearch = () => {
    searchOpen.value = !searchOpen.value
    if (searchOpen.value) {
        nextTick(() => searchInput.value?.focus())
    }
}

const toggleDarkMode = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
}

const closeAll = () => {
    mobileOpen.value = false
    activeDropdown.value = null
    mobileAccordion.value = ''
}

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        closeAll()
        searchOpen.value = false
        router.push(`/articles?q=${encodeURIComponent(searchQuery.value.trim())}`)
        searchQuery.value = ''
    }
}

const handleLogout = async () => {
    closeAll()
    await logout()
}

const switchLocale = () => {
    const newLocale = locale.value === 'id' ? 'en' : 'id'
    setLocale(newLocale)
}
</script>

<style scoped>
.nav-link {
    @apply flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-xl hover:text-primary hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer;
}

.nav-link-active {
    @apply text-primary bg-primary/5 dark:bg-primary/10;
}

.action-btn {
    @apply size-10 flex items-center justify-center rounded-full text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer;
}

.dropdown-item {
    @apply flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer;
}

.dropdown-icon {
    @apply size-10 rounded-xl flex items-center justify-center shrink-0;
}

.mobile-nav-link {
    @apply flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200;
}

.mobile-sub-link {
    @apply flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all duration-200;
}
</style>
