<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useModalStore } from "../stores/modal";
import { useBebidasStore } from "../stores/bebidas";
import { useFavoritosStore } from "../stores/favoritos";
const modalStore = useModalStore();
const storeBebidas = useBebidasStore();
const favoritosStore = useFavoritosStore();

const formatearIngredientes = () => {
  const ingredientesDiv = document.createElement("DIV");
  for (let i = 1; i <= 15; i++) {
    if (storeBebidas.cocktail[`strIngredient${i}`]) {
      const ingrediente = storeBebidas.cocktail[`strIngredient${i}`];
      const cantidad = storeBebidas.cocktail[`strMeasure${i}`];

      const ingredienteCantidad = document.createElement("P");
      ingredienteCantidad.classList.add("text-gray-600", "text-lg");
      ingredienteCantidad.textContent = `${ingrediente} - ${cantidad}`;

      ingredientesDiv.appendChild(ingredienteCantidad);
    }
  }
  return ingredientesDiv;
};
</script>

<template>
  <TransitionRoot as="template" :show="modalStore.modal">
    <Dialog as="div" class="relative z-10" @close="modalStore.toggleModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-3">
                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-4xl font-bold text-center my-5"
                    >{{ storeBebidas.cocktail.strDrink }}</DialogTitle
                  >
                  :<img
                    :src="storeBebidas.cocktail.strDrinkThumb"
                    :alt="'Imagen de ' + storeBebidas.cocktail.strDrink"
                    class="mx-auto w-96"
                  />
                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-4xl font-bold text-center my-5"
                    >Ingredientes y Cantidades</DialogTitle
                  >
                  <div v-html="formatearIngredientes().outerHTML"></div>

                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-4xl font-bold text-center my-5"
                    >Instrucciones</DialogTitle
                  >
                  <p class="text-lg">
                    {{ storeBebidas.cocktail.strInstructions }}
                  </p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
                  @click="modalStore.toggleModal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                  @click="favoritosStore.handleClickFavoritos()"
                >
                  Agregar a Favoritos
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
