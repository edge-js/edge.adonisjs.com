<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  outline?: boolean
  tag?: 'button' | 'a'
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  outline: false,
  tag: 'button',
})

const classes = computed(() => {
  const classes = [
    'text-sm px-4 py-2 cursor-pointer rounded-full font-medium transition duration-300',
    'hover:opacity-80',
  ]

  if (props.outline) {
    classes.push('text-white bg-primary')
  } else {
    classes.push('border-primary border')
  }

  return classes
})
</script>

<template>
  <component :is="tag" :class="classes" :href="href">
    <slot />
  </component>
</template>
