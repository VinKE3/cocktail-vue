import { defineStore } from "pinia";
import { ref, reactive, onMounted } from "vue";
import APIServices from "../services/APIServices";

export const useBebidasStore = defineStore("bebidas", () => {
  const categories = ref([]);
  const search = reactive({
    name: "",
    category: "",
  });
  const cocktails = ref([]);
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
  return {
    categories,
    search,
    getCocktail,
    cocktails,
  };
});
