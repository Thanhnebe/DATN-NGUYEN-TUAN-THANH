import * as Types from './../../constants/ActionType';
let initialState = {
  revenues: {},
  topSelling: {
    products: []
  },
  topNotSelling: {
    products: []
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_DASHBOARD:
      return { ...state, revenues: action.data };
    case Types.FETCH_DASHBOARD_TOP_SELLING:
      return { ...state, topSelling: action.data };
    case Types.FETCH_DASHBOARD_TOP_NOT_SELLING:
      return { ...state, topNotSelling: action.data };
    default: return { ...state };
  }
};

export default user;