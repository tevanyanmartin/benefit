import initialState from "./initialState";
export const SET_BRANDS = "SET_BRANDS";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_ITEMS = "SET_ITEMS";
export const SET_NEWS_ITEMS = "SET_NEWS_ITEMS";
export const SET_USER = "SET_USER";
export const SET_ITEMS_BY_BRAND = "SET_ITEMS_BY_BRAND";
export const SET_ITEMS_BY_CATEGORY = "SET_ITEMS_BY_CATEGORY";
export const SET_SELECTED_ITEM = "SET_SELECTED_ITEM";
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BRANDS: {
      return {
        ...state,
        brands: action.payload,
      };
    }
    case SET_CATEGORY: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case SET_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case SET_NEWS_ITEMS: {
      return {
        ...state,
        news: action.payload,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SET_ITEMS_BY_BRAND: {
      return {
        ...state,
        filterByBrand: action.payload,
      };
    }
    case SET_ITEMS_BY_CATEGORY: {
      return {
        ...state,
        filterByCategory: action.payload,
      };
    }
    case SET_SELECTED_ITEM: {
      return {
        ...state,
        selectedItem: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
