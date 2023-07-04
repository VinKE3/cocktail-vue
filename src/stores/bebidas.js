import { defineStore } from "pinia";
import { ref, reactive, onMounted, computed } from "vue";
import APIServices from "../services/APIServices";
import { useModalStore } from "./modal";

export const useBebidasStore = defineStore("bebidas", () => {
  const modal = useModalStore();
  const categories = ref([]);
  const search = reactive({
    name: "",
    category: "",
  });
  const cocktails = ref([]);
  const cocktail = ref({});
  onMounted(async function () {
    const {
      data: { drinks },
    } = await APIServices.getCategories();
    categories.value = drinks;
  });
  async function getCocktail() {
    const {
      data: { drinks },
    } = await APIServices.getCocktail(search);
    cocktails.value = drinks;
  }
  async function getCocktailById(id) {
    const {
      data: { drinks },
    } = await APIServices.getCocktailById(id);
    cocktail.value = drinks[0];
    modal.toggleModal();
  }

  const nobebidas = computed(
    () => !cocktails.value || cocktails.value.length === 0
  );

  const filtroBusquedaPorNombre = computed(() => {
    return cocktails.value.filter((cocktail) =>
      cocktail.strDrink.toLowerCase().includes(search.name.toLowerCase())
    );
  });

  return {
    categories,
    search,
    cocktail,
    cocktails,
    getCocktail,
    getCocktailById,
    nobebidas,
    filtroBusquedaPorNombre,
  };
});
