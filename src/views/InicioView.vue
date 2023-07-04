<script setup>
import Receta from "../components/Receta.vue";
import { useBebidasStore } from "../stores/bebidas";
const bebidasStore = useBebidasStore();
</script>
<template>
  <h1 class="text-6xl font-extrabold text-center">Recetas</h1>
  <p
    v-if="bebidasStore.nobebidas"
    class="text-center uppercase mt-10 font-extrabold text-orange-500"
  >
    No hay bebidas
  </p>
  <div v-else class="text-center">
    <h1 class="text-6xl font-extrabold text-center text-orange-500">
      Buscar Por Nombre
    </h1>
    <div class="flex justify-center mt-10">
      <input
        class="border border-gray-300 rounded-lg px-5 py-2 w-1/2"
        type="text"
        placeholder="Buscar bebida"
      />
    </div>
  </div>
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
