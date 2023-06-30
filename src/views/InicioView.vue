<script setup>
import Receta from "../components/Receta.vue";
import { useBebidasStore } from "../stores/bebidas";
const bebidasStore = useBebidasStore();
</script>
<template>
  <h1 class="text-6xl font-extrabold text-center">Recetas</h1>
  <div
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 my-10 gap-10"
  >
    <Receta
      v-for="cocktail in bebidasStore.cocktails"
      :cocktail="cocktail"
      :key="cocktail.idDrink"
    />
  </div>
</template>

<style lang="scss" scoped></style>
