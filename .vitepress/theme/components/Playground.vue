<script setup lang="ts">
import sdk from '@stackblitz/sdk'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  slug: string
  openFile?: string
}>()

const stackblitzContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!stackblitzContainer.value) {
    return
  }

  sdk.embedProjectId(stackblitzContainer.value, props.slug, {
    forceEmbedLayout: true,
    openFile: props.openFile || 'index.ts',
    theme: 'default',
  })
})
</script>

<template>
  <div class="container relative mx-auto px-8 py-4">
    <div class="absolute top-0 -z-1 flex items-center justify-center h-full w-full flex flex-col">
      <p class="mb-8 text-5xl i-line-md-loading-loop" />
      <p class="text-xs">Loading ...</p>
    </div>
    <div
      id="stackblitzCcontainer"
      ref="stackblitzContainer"
      class="border-0 rounded-lg shadow z-10"
    ></div>
  </div>
</template>

<style>
#stackblitzCcontainer {
  height: calc(100vh - 150px);
}

#stackblitzCcontainer iframe {
  height: 100%;
}
</style>
