export const selectUser = (state) => state.user;
export const selectBrands = (state) => state.brands;
export const selectCategories = (state) => state.categories;
export const selectItems = (state) => state.items;
export const selectNews = (state) => state.news;
export const selectCategoryById = (id) => (state) =>
  state.categories.find((category) => category.categoryId === id);
export const selectBrandById = (id) => (state) =>
  state.brands.find((brand) => brand.brandId === id);
export const selectItemById = (id) => (state) =>
  state.items.find((item) => item.itemId === id);
export const selectBagCount = (state) =>
  state.user.data ? state.user && state.user.data.bag.length : "";
