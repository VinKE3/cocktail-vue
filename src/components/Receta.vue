<script setup>
import { useBebidasStore } from "../stores/bebidas";
const storeBebidas = useBebidasStore();
defineProps({
  cocktail: {
    type: Object,
  },
});
defineEmits(["get-cocktail-by-id"]);
</script>
<template>
  <div class="border shadow-lg">
    <div class="overflow-hidden">
      <img
        class="hover:scale-110 transition duration-300 ease-in-out"
        :src="cocktail.strDrinkThumb"
        :alt="'imagen de ' + cocktail.strDrink"
      />
    </div>
    <div class="p-5">
      <h2 class="truncate font-extrabold text-2xl">{{ cocktail.strDrink }}</h2>
      <button
        class="bg-orange-500 text-white uppercase font-bold text-lg px-5 py-2 w-full rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out mt-5"
        type="button"
        @click="storeBebidas.getCocktailById(cocktail.idDrink)"
      >
        Ver Receta
      </button>
    </div>
  </div>
</template>
