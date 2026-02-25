<template>
  <div class="flex items-center" :class="sizeClasses.wrapper">
    <div
      class="rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center font-bold text-white"
      :class="sizeClasses.avatar">
      {{ author.name?.charAt(0)?.toUpperCase() || '?' }}
    </div>
    <div>
      <p class="font-medium text-slate-900 dark:text-slate-200" :class="sizeClasses.name">{{ author.name }}</p>
      <p class="text-slate-500" :class="sizeClasses.username">@{{ author.username }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  author: {
    id: string
    username: string
    name: string
    role: string
  }
  size?: 'sm' | 'md' | 'lg'
}>()

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return { wrapper: 'gap-2', avatar: 'w-6 h-6 text-xs', name: 'text-xs', username: 'text-[10px]' }
    case 'lg':
      return { wrapper: 'gap-3', avatar: 'w-12 h-12 text-lg', name: 'text-base', username: 'text-sm' }
    default:
      return { wrapper: 'gap-2.5', avatar: 'w-9 h-9 text-sm', name: 'text-sm', username: 'text-xs' }
  }
})
</script>
