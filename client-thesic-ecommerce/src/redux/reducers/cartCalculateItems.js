

import * as Types from './../../constants/ActionType';
let initialState = {
    data: {},
    selectedItems: []
};

const cartCalculateItems = (state = initialState, action) => {
    switch (action.type) {
        case Types.CALCULATE_CART_ITEMS: 
            return {...state, data: action.data}
        case Types.SET_SELECTED_ITEMS:
            return {...state, selectedItems: action.items}
        case Types.CLEAR_ITEMS_SELECTED:
            return {data: {}, selectedItems: []}
        default: return {...state};
        
    }
};

export default cartCalculateItems;