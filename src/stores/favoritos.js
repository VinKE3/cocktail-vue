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
  function existeFavorito() {
    const favoritoLocalStorage =
      JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return favoritoLocalStorage.some(
      (favorito) => favorito.idDrink === bebidas.cocktail.idDrink
    );
  }
  function handleClickFavoritos() {
    if (existeFavorito()) {
      eliminarFavorito();
      alert("Se ha eliminado de favoritos");
    } else {
      favoritos.value.push(bebidas.cocktail);
      alert("Se ha agregado a favoritos");
    }
    modal.toggleModal(false);
  }
  function eliminarFavorito() {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito.idDrink !== bebidas.cocktail.idDrink
    );
  }

  return {
    handleClickFavoritos,
    favoritos,
    existeFavorito,
    eliminarFavorito,
  };
});
