import * as Types from "./../../constants/ActionType";
let initialState = [];

const categories = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_CATEGORIES:
      state = action.categories;
      return [...state];
    case Types.FETCH_CATEGORY_TREE:
      state = action.categories;
      return [...state];
    default:
      return [...state];
  }
};

export default categories;
