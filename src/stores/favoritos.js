import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas.js";
import { useModalStore } from "./modal.js";
import { ref, watch, onMounted } from "vue";

export const useFavoritosStore = defineStore("favoritos", () => {
  const bebidas = useBebidasStore();
  const modal = useModalStore();
  const favoritos = ref([]);
  // Cargar favoritos guardados en el localStorage al montar la vista
  onMounted(() => {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos"));
    if (Array.isArray(favoritosGuardados)) {
      favoritos.value = favoritosGuardados;
    }
  });
  watch(
    favoritos,
    () => {
      sincronizarLocalStorage();
    },
    {
      deep: true,
    }
  );
  const sincronizarLocalStorage = () => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  };
  const handleClickFavoritos = () => {
    favoritos.value.push(bebidas.cocktail);
    modal.toggleModal(false);
  };
  return {
    handleClickFavoritos,
    favoritos,
  };
});
