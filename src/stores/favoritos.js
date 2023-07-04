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
    favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [];
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
  function sincronizarLocalStorage() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  }
  function existeFavorito(id) {
    const favoritoLocalStorage =
      JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return favoritoLocalStorage.some((favorito) => favorito.idDrink === id);
  }
  function handleClickFavoritos() {
    console.log(bebidas.cocktail);
    if (existeFavorito(bebidas.cocktail.idDrink)) {
      alert("Ya existe en favoritos");
    } else {
      favoritos.value.push(bebidas.cocktail);
      modal.toggleModal(false);
    }
  }

  return {
    handleClickFavoritos,
    favoritos,
    existeFavorito,
  };
});
