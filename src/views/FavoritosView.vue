<script setup>
import { useFavoritosStore } from "../stores/favoritos";
import Receta from "../components/Receta.vue";
import { computed } from "vue";

const { favoritos } = useFavoritosStore();
const hayFavoritos = computed(() => favoritos.length > 0);
</script>

<template>
  <div>
    <h1 class="text-6xl font-extrabold text-center">Favoritos</h1>
    <div v-if="hayFavoritos" class="text-center mt-10">
      <Receta
        v-for="favorito in favoritos"
        :cocktail="favorito"
        :key="favorito.idDrink"
        :id="favorito.idDrink"
      />
    </div>
    <div v-else>
      <p>No tienes favoritos guardados.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
