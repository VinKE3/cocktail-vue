<script setup>
import Receta from "../components/Receta.vue";
import { ref, watch, computed } from "vue";
import { useBebidasStore } from "../stores/bebidas";
const bebidasStore = useBebidasStore();
const filtroLocal = ref("");
const dataLocal = ref([]);

watch(
  () => bebidasStore.cocktails,
  (cocktails) => {
    dataLocal.value = cocktails;
  }
);
const bebidasFiltradas = computed(() => {
  if (!filtroLocal.value) {
    return dataLocal.value;
  }
  const filtro = filtroLocal.value.toLowerCase();
  return dataLocal.value.filter((bebida) =>
    bebida.strDrink.toLowerCase().includes(filtro)
  );
});
</script>
<template>
  <h1 class="text-6xl font-extrabold text-center">Recetas</h1>
  <p
    v-if="bebidasStore.nobebidas"
    class="text-center uppercase mt-10 font-extrabold text-orange-500"
  >
    No hay recetas todavia
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
        v-model="filtroLocal"
        @input="filtrarDataLocal"
      />
    </div>
  </div>
  <div
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 my-10 gap-10"
  >
    <Receta
      v-for="cocktail in bebidasFiltradas"
      :cocktail="cocktail"
      :key="cocktail.idDrink"
    />
  </div>
</template>
