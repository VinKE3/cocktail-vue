<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <main class="bg-gray-100">
    <div class="mx-auto container px-5 py-16">
      <RouterView />
    </div>
  </main>
</template>
