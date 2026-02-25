<template>
  <NuxtLink v-if="!noLink" :to="`/articles?tag=${encodeURIComponent(tag)}`" class="badge-tag"
    :class="size === 'sm' ? 'text-[10px] px-2 py-0.5' : ''">
    #{{ tag }}
  </NuxtLink>
  <span v-else class="badge-tag" :class="size === 'sm' ? 'text-[10px] px-2 py-0.5' : ''">
    #{{ tag }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  tag: string
  size?: 'sm' | 'md'
  noLink?: boolean
}>()
</script>
