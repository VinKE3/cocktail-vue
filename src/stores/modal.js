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
  return {
    modal,
    toggleModal,
    textoBoton,
  };
});
