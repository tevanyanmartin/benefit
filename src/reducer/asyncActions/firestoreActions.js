import firestoreSvc from "../../services/firestoreSvc";
import { SET_BRANDS, SET_CATEGORY, SET_ITEMS, SET_NEWS_ITEMS } from "../reducer";

export const getCategoriesAction = () => async (dispatch) => {
  const categoryState = [];
  const doc = await firestoreSvc.getCategories();
  doc.forEach((category) => {
    categoryState.push({
      categoryId: category.id,
      ...category.data(),
    });
  });
  dispatch({
    type: SET_CATEGORY,
    payload: categoryState,
  });
};

export const getBrandsActions = () => async (dispatch) => {
  const brandState = [];
  const doc = await firestoreSvc.getBrands();
  doc.forEach((brand) => {
    brandState.push({
      brandId: brand.id,
      ...brand.data(),
    });
  });
  dispatch({
    type: SET_BRANDS,
    payload: brandState,
  });
};

export const getItemsActions = () => async (dispatch) => {
  const itemsState = [];
  const querySnapshot = await firestoreSvc.getItems();
  querySnapshot.forEach((item) => {
    itemsState.push({
      itemId: item.id,
      ...item.data(),
    });
  });
  dispatch({
    type: SET_ITEMS,
    payload: itemsState,
  });
};
 
export const getNewItemsActions = () => async (dispatch) => {
  const newsState = [];
  const querySnapshot = await firestoreSvc.getNewItems();
  querySnapshot.forEach((item) => {
    newsState.push({
      itemId: item.id,
      ...item.data(),
    });
  });
  dispatch({
    type: SET_NEWS_ITEMS,
    payload: newsState,
  });
}