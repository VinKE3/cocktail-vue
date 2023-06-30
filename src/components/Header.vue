<script setup>
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";
import { useBebidasStore } from "../stores/bebidas";
const route = useRoute();
const store = useBebidasStore();
console.log(store);
const isInicio = computed(() => route.name === "inicio");
const handleSubmit = () => {
  store.getCocktail();
};
</script>
<template>
  <header class="bg-slate-800" :class="{ header: isInicio }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'inicio' }">
            <img class="w-32" src="/public/img/logo.svg" />
          </RouterLink>
        </div>
        <nav>
          <RouterLink
            class="text-white uppercase font-bold text-lg mr-6 hover:text-orange-500 transition duration-300 ease-in-out"
            :to="{ name: 'inicio' }"
            active-class="text-orange-500"
            >Inicio</RouterLink
          >
          <RouterLink
            class="text-white uppercase font-bold text-lg mr-6 hover:text-orange-500 transition duration-300 ease-in-out"
            :to="{ name: 'favoritos' }"
            active-class="text-orange-500"
            >Favoritos</RouterLink
          >
        </nav>
      </div>
      <form
        v-if="isInicio"
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
            >Nombre o Ingredientes</label
          >
          <input
            class="w-full rounded-lg border-2 border-white p-3 focus:outline-none focus:border-orange-500"
            type="text"
            name="ingrediente"
            id="ingrediente"
            placeholder="Nombre o Ingredientes: ej. Pisco, Ron, etc."
            v-model="store.search.name"
          />
        </div>
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="categoria"
            >Categoria</label
          >
          <select
            class="w-full rounded-lg border-2 border-white p-3 focus:outline-none focus:border-orange-500"
            name="categoria"
            id="categoria"
            v-model="store.search.category"
          >
            <option value="">-- Seleccione --</option>
            <option
              v-for="categoria in store.categories"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >
              {{ categoria.strCategory }}
            </option>
          </select>
        </div>
        <input
          class="w-full bg-white text-orange-500 font-bold uppercase text-lg rounded-lg p-3 cursor-pointer hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out"
          type="submit"
          value="Buscar Recetas"
        />
      </form>
    </div>
  </header>
</template>

<style>
.header {
  background-image: url("/public/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
