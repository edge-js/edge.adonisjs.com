<script setup lang="ts">
import { VPHomeFeatures } from 'vitepress/theme'
</script>

<template>
  <div class="flex flex-col h-full container mx-auto py-4 px-8">
    <div class="text-center">
      <div
        class="text-gradient-primary flex flex-col items-center justify-center py-4 text-primary text-center text-5xl font-black mt-14 sm:flex-row"
      >
        <img class="mx-8 w-32 relative mb-8 sm:w-15 sm:-rotate-4 sm:mb-0" src="/edge-logo.png" />
        <p>Edge.js</p>
      </div>

      <p class="mt-2 font-bold text-4xl">A templating engine with fresh air</p>
      <p class="mt-2 text-gray-500">Logical and batteries-included template engine for Node.js</p>
    </div>

    <div class="flex flex-col justify-center mt-6 sm:flex-row sm:space-x-3 space-y-4 sm:space-y-0">
      <VPButton href="/docs/introduction/what-is-edge" tag="a" outline>What is Edge ?</VPButton>
      <VPButton href="/docs/introduction/getting-started" tag="a">Get Started</VPButton>
      <VPButton href="https://github.com/edge-js/edge" tag="a">See on GitHub</VPButton>
    </div>
  </div>

  <VPHomeFeatures class="my-8" />

  <div class="container mx-auto px-8">
    <img
      class="m-auto"
      src="https://raw.githubusercontent.com/thetutlage/static/main/sponsorkit/sponsors.svg"
    />
  </div>

  <footer class="text-center text-xs py-5 border-t edge-border">
    Built with ❤️ by the
    <a href="http://adonisjs.com" target="_blank" class="font-semibold text-[#925ef7]"> AdonisJS</a>
    team.
  </footer>
</template>

<style scoped>
.text-gradient-primary {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(
    90deg,
    hsl(340deg 91% 58%) 0%,
    hsl(355deg 100% 66%) 39%,
    hsl(12deg 100% 64%) 61%,
    hsl(25deg 99% 61%) 100%
  );
}
</style>
