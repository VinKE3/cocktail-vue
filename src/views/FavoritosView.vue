<script setup>
import { useFavoritosStore } from "../stores/favoritos";
import Receta from "../components/Receta.vue";
import { computed } from "vue";

const favoritos = useFavoritosStore();
const hayFavoritos = computed(() => favoritos.favoritos.length > 0);
const cantidadFavoritos = computed(() => favoritos.favoritos.length);
</script>

<template>
  <div>
    <h1 class="text-6xl font-extrabold text-center text-orange-500">
      Favoritos
      <span class="text-5xl text-orange-600">({{ cantidadFavoritos }})</span>
    </h1>
    <div v-if="hayFavoritos" class="text-center mt-10">
      <Receta
        v-for="favorito in favoritos.favoritos"
        :cocktail="favorito"
        :key="favorito.idDrink"
        :id="favorito.idDrink"
      />
    </div>
    <div v-else>
      <p class="text-center uppercase mt-10 text-orange-500 font-extrabold">
        No tienes favoritos guardados.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
