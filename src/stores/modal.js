import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useFavoritosStore } from "./favoritos";
import { useBebidasStore } from "./bebidas";

export const useModalStore = defineStore("modal", () => {
  const modal = ref(false);
  const favoritos = useFavoritosStore();
  const bebidas = useBebidasStore();
  //?action
  function toggleModal() {
    modal.value = !modal.value;
  }
  //?getter
  const textoBoton = computed(() => {
    return favoritos.existeFavorito(bebidas.cocktail.idDrink)
      ? "Eliminar de favoritos"
      : "Agregar a favoritos";
  });
  const claseBoton = computed(() => {
    return favoritos.existeFavorito(bebidas.cocktail.idDrink)
      ? "bg-red-500 hover:bg-red-600"
      : "bg-green-500 hover:bg-green-600";
  });
  return {
    modal,
    toggleModal,
    textoBoton,
    claseBoton,
  };
});
