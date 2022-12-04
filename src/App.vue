<script setup>
import PasswordGenerator from './components/PasswordGenerator.vue'
</script>

<template>
  <main
    id="johansantana-main"
    class="bg-[url('/grain-dark.png')] min-h-screen flex font-mono items-center justify-center p-10 md:overflow-hidden"
  >
    <PasswordGenerator />
  </main>
</template>

<style>
@import url('./assets/styles/binary.css');
</style>
