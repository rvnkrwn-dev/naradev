<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">

    <!-- Language Tabs -->
    <div class="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
      <button type="button" @click="activeLang = 'id'"
        class="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-semibold transition-all cursor-pointer"
        :class="activeLang === 'id'
          ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'">
        🇮🇩 {{ $t('article_form.lang_tab_id') }}
        <span v-if="idComplete"
          class="inline-flex items-center justify-center size-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px]">✓</span>
        <span v-else-if="hasValidationError"
          class="inline-flex items-center justify-center size-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 text-[10px] font-bold">!</span>
      </button>
      <button type="button" @click="activeLang = 'en'"
        class="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-semibold transition-all cursor-pointer"
        :class="activeLang === 'en'
          ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'">
        🇬🇧 {{ $t('article_form.lang_tab_en') }}
        <span v-if="enComplete"
          class="inline-flex items-center justify-center size-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px]">✓</span>
        <span v-else-if="hasValidationError"
          class="inline-flex items-center justify-center size-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 text-[10px] font-bold">!</span>
      </button>
    </div>

    <!-- Title (ID) -->
    <div v-show="activeLang === 'id'">
      <label for="title_id" class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{{
        $t('article_form.title_label_id') }}</label>
      <input id="title_id" v-model="form.title_id" type="text"
        class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
        :placeholder="$t('article_form.title_placeholder_id')" />
    </div>

    <!-- Title (EN) -->
    <div v-show="activeLang === 'en'">
      <label for="title_en" class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{{
        $t('article_form.title_label_en') }}</label>
      <input id="title_en" v-model="form.title_en" type="text"
        class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
        :placeholder="$t('article_form.title_placeholder_en')" />
    </div>

    <!-- Cover Image Upload -->
    <div>
      <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
        {{ $t('article_form.cover_label') }} <span class="text-slate-400 font-normal">{{ $t('article_form.cover_hint')
        }}</span>
      </label>

      <!-- Upload area -->
      <div v-if="!coverPreview"
        class="relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:border-primary dark:hover:border-primary transition-colors cursor-pointer group"
        @click="triggerFileInput" @dragover.prevent="dragActive = true" @dragleave.prevent="dragActive = false"
        @drop.prevent="handleDrop" :class="{ 'border-primary bg-primary/5': dragActive }">
        <div class="flex flex-col items-center justify-center py-10">
          <span
            class="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors mb-3"
            style="font-size: 48px;">cloud_upload</span>
          <p class="text-sm font-medium text-slate-600 dark:text-slate-300">
            <span class="text-primary font-semibold">{{ $t('article_form.cover_upload_cta') }}</span> {{
              $t('article_form.cover_drag') }}
          </p>
          <p class="text-xs text-slate-400 mt-1">{{ $t('article_form.cover_formats') }}</p>
        </div>
        <input ref="fileInputRef" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          class="hidden" @change="handleFileSelect" />
      </div>

      <!-- Upload progress -->
      <div v-if="uploading" class="flex items-center gap-3 mt-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <svg class="animate-spin w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span class="text-sm text-primary font-medium">{{ $t('article_form.cover_uploading') }}</span>
      </div>

      <!-- Upload error -->
      <div v-if="uploadError"
        class="mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
        <span class="material-symbols-outlined shrink-0 mt-0.5" style="font-size: 16px;">error</span>
        <span>{{ uploadError }}</span>
      </div>

      <!-- Cover Preview with remove -->
      <div v-if="coverPreview && !uploading"
        class="mt-3 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
        <div class="aspect-[21/9]">
          <img :src="coverPreview" :alt="$t('article_form.cover_preview_alt')" class="w-full h-full object-cover" />
        </div>
        <div
          class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button type="button" @click="triggerFileInput"
              class="px-4 py-2 rounded-lg bg-white/90 text-slate-800 text-sm font-medium hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined" style="font-size: 16px;">swap_horiz</span>
              {{ $t('article_form.cover_replace') }}
            </button>
            <button type="button" @click="removeCover"
              class="px-4 py-2 rounded-lg bg-red-500/90 text-white text-sm font-medium hover:bg-red-500 transition-colors flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
              {{ $t('article_form.cover_remove') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Slug (optional) -->
    <div>
      <label for="slug" class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
        {{ $t('article_form.slug_label') }} <span class="text-slate-400 font-normal">{{ $t('article_form.slug_hint')
        }}</span>
      </label>
      <input id="slug" v-model="form.slug" type="text"
        class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
        :placeholder="$t('article_form.slug_placeholder')" />
    </div>

    <!-- Description (ID) -->
    <div v-show="activeLang === 'id'">
      <label for="description_id" class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{{
        $t('article_form.description_label_id') }}</label>
      <textarea id="description_id" v-model="form.description_id"
        class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm resize-none"
        rows="2" :placeholder="$t('article_form.description_placeholder_id')" />
    </div>

    <!-- Description (EN) -->
    <div v-show="activeLang === 'en'">
      <label for="description_en" class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{{
        $t('article_form.description_label_en') }}</label>
      <textarea id="description_en" v-model="form.description_en"
        class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm resize-none"
        rows="2" :placeholder="$t('article_form.description_placeholder_en')" />
    </div>

    <!-- Tags -->
    <div>
      <label for="tags" class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
        {{ $t('article_form.tags_label') }} <span class="text-slate-400 font-normal">{{ $t('article_form.tags_hint')
        }}</span>
      </label>
      <input id="tags" v-model="tagsInput" type="text"
        class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
        :placeholder="$t('article_form.tags_placeholder')" />
    </div>

    <!-- Status -->
    <div>
      <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">{{
        $t('article_form.status_label') }}</label>
      <div class="flex gap-4">
        <label class="flex items-center gap-2.5 cursor-pointer px-4 py-2.5 rounded-xl border transition-all" :class="form.status === 'draft'
          ? 'border-primary bg-primary/5 text-primary dark:bg-primary/10'
          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'">
          <input type="radio" v-model="form.status" value="draft" class="accent-primary hidden" />
          <span class="material-symbols-outlined" style="font-size: 18px;">edit_note</span>
          <span class="text-sm font-medium">{{ $t('article_form.status_draft') }}</span>
        </label>
        <label class="flex items-center gap-2.5 cursor-pointer px-4 py-2.5 rounded-xl border transition-all" :class="form.status === 'published'
          ? 'border-primary bg-primary/5 text-primary dark:bg-primary/10'
          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'">
          <input type="radio" v-model="form.status" value="published" class="accent-primary hidden" />
          <span class="material-symbols-outlined" style="font-size: 18px;">public</span>
          <span class="text-sm font-medium">{{ $t('article_form.status_published') }}</span>
        </label>
      </div>
    </div>

    <!-- Markdown Editor (ID) -->
    <div v-show="activeLang === 'id'">
      <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{{
        $t('article_form.content_label_id') }}</label>
      <div class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <ClientOnly>
          <MdEditor v-model="form.markdown_id" :theme="editorTheme" :language="locale === 'id' ? 'zh-CN' : 'en-US'"
            :preview="true" :toolbarsExclude="['github', 'htmlPreview', 'catalog', 'save']" style="height: 500px;"
            :placeholder="$t('article_form.content_placeholder_id')" :showCodeRowNumber="true" noUploadImg />
          <template #fallback>
            <div class="h-[500px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
              <div class="text-center">
                <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 mb-2 block"
                  style="font-size: 40px;">edit_note</span>
                <p class="text-sm text-slate-400">{{ $t('article_form.editor_loading') }}</p>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <!-- Markdown Editor (EN) -->
    <div v-show="activeLang === 'en'">
      <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{{
        $t('article_form.content_label_en') }}</label>
      <div class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <ClientOnly>
          <MdEditor v-model="form.markdown_en" :theme="editorTheme" language="en-US" :preview="true"
            :toolbarsExclude="['github', 'htmlPreview', 'catalog', 'save']" style="height: 500px;"
            :placeholder="$t('article_form.content_placeholder_en')" :showCodeRowNumber="true" noUploadImg />
          <template #fallback>
            <div class="h-[500px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
              <div class="text-center">
                <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 mb-2 block"
                  style="font-size: 40px;">edit_note</span>
                <p class="text-sm text-slate-400">{{ $t('article_form.editor_loading') }}</p>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3 pt-2">
      <button type="submit"
        class="h-12 px-8 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        :disabled="submitting || uploading">
        <svg v-if="submitting" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {{ submitLabel }}
      </button>
      <NuxtLink :to="localePath('/dashboard')"
        class="h-12 px-6 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center">
        {{ $t('common.cancel') }}
      </NuxtLink>
    </div>

    <!-- Error -->
    <div v-if="error"
      class="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-2.5">
      <span class="material-symbols-outlined shrink-0 mt-0.5" style="font-size: 18px;">error</span>
      <span>{{ error }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
  initialData?: {
    title_id?: string
    title_en?: string
    slug?: string
    description_id?: string
    description_en?: string
    tags?: string[]
    status?: string
    markdown_id?: string
    markdown_en?: string
    cover?: string
  }
  submitLabel?: string
}>()

const emit = defineEmits<{
  submit: [data: {
    title_id: string
    title_en: string
    slug: string
    description_id: string
    description_en: string
    tags: string[]
    status: string
    markdown_id: string
    markdown_en: string
    cover: string
  }]
}>()

// Active language tab
const activeLang = ref<'id' | 'en'>('id')
const hasValidationError = ref(false)

// Completion indicators
const idComplete = computed(() => {
  return form.title_id.trim().length >= 3 && form.markdown_id.trim().length >= 10
})
const enComplete = computed(() => {
  return form.title_en.trim().length >= 3 && form.markdown_en.trim().length >= 10
})

// Detect dark mode for editor theme
const editorTheme = ref<'light' | 'dark'>('light')

onMounted(() => {
  editorTheme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  const observer = new MutationObserver(() => {
    editorTheme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  onUnmounted(() => observer.disconnect())
})

const form = reactive({
  title_id: props.initialData?.title_id || '',
  title_en: props.initialData?.title_en || '',
  slug: props.initialData?.slug || '',
  description_id: props.initialData?.description_id || '',
  description_en: props.initialData?.description_en || '',
  status: props.initialData?.status || 'draft',
  markdown_id: props.initialData?.markdown_id || '',
  markdown_en: props.initialData?.markdown_en || '',
  cover: props.initialData?.cover || '',
})

const tagsInput = ref(props.initialData?.tags?.join(', ') || '')
const submitting = ref(false)
const error = ref('')

// Cover upload state
const fileInputRef = ref<HTMLInputElement>()
const coverPreview = ref(props.initialData?.cover || '')
const uploading = ref(false)
const uploadError = ref('')
const dragActive = ref(false)

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) {
    uploadCover(input.files[0])
  }
}

const handleDrop = (e: DragEvent) => {
  dragActive.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    uploadCover(file)
  }
}

const uploadCover = async (file: File) => {
  uploadError.value = ''

  // Client-side validation
  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = t('article_form.error.file_too_large')
    return
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
  if (!allowedTypes.includes(file.type)) {
    uploadError.value = t('article_form.error.invalid_format')
    return
  }

  uploading.value = true

  try {
    const formData = new FormData()
    formData.append('cover', file)

    const result = await $fetch<{ url: string }>('/api/upload', {
      method: 'POST',
      body: formData,
    })

    form.cover = result.url
    coverPreview.value = result.url
  } catch (err: any) {
    uploadError.value = err?.data?.message || t('article_form.error.upload_failed')
  } finally {
    uploading.value = false
    // Reset file input
    if (fileInputRef.value) fileInputRef.value.value = ''
  }
}

const removeCover = () => {
  form.cover = ''
  coverPreview.value = ''
  uploadError.value = ''
}

const handleSubmit = () => {
  error.value = ''
  hasValidationError.value = false

  // Client-side validation: both languages required
  const errors: string[] = []

  if (form.title_id.trim().length < 3) errors.push(t('article_form.error.title_id_required'))
  if (form.title_en.trim().length < 3) errors.push(t('article_form.error.title_en_required'))
  if (form.markdown_id.trim().length < 10) errors.push(t('article_form.error.content_id_required'))
  if (form.markdown_en.trim().length < 10) errors.push(t('article_form.error.content_en_required'))

  if (errors.length > 0) {
    error.value = errors.join(' • ')
    hasValidationError.value = true
    // Switch to the incomplete tab
    if (!idComplete.value) {
      activeLang.value = 'id'
    } else if (!enComplete.value) {
      activeLang.value = 'en'
    }
    return
  }

  submitting.value = true

  const tags = tagsInput.value
    .split(',')
    .map((t: string) => t.trim().toLowerCase())
    .filter((t: string) => t.length > 0)

  emit('submit', {
    title_id: form.title_id,
    title_en: form.title_en,
    slug: form.slug,
    description_id: form.description_id,
    description_en: form.description_en,
    tags,
    status: form.status,
    markdown_id: form.markdown_id,
    markdown_en: form.markdown_en,
    cover: form.cover,
  })

  setTimeout(() => { submitting.value = false }, 3000)
}
</script>
