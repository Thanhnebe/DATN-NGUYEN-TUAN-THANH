import * as Types from './../../constants/ActionType';
let initialState = {
    productByCategory: {
        products: [],
        pagination: {},
    },
    productByKeyword: {
        products: [],
        pagination: {},
    },
    productHot: {
        products: [],
        pagination: {},
    },
    productBestSelling: {
        products: [],
        pagination: {},
    },
    productFeature: {
        products: [],
        pagination: {},
    },
    productSameCategory: {
        products: [],
        pagination: {},
    },
    allProduct: {
        products: [],
        pagination: {},
    },
};

const productsV2 = (state = initialState, action) => {
    switch (action.type) {
        case Types.SEARCH_PRODUCT_BY_CATEGORY:
            return {...state, productByCategory: action.productByCategory};
        case Types.SEARCH_PRODUCT_BY_KEYWORD:
            return {...state, productByKeyword: action.productByKeyword};
        case Types.SEARCH_PRODUCT_HOT:
            return {...state, productHot: action.productHot};
        case Types.SEARCH_PRODUCT_BEST_SELLING:
            return {...state, productBestSelling: action.productBestSelling};
        case Types.SEARCH_PRODUCT_FEATURE:
            return {...state, productFeature: action.productFeature};
        case Types.SEARCH_PRODUCT_SAME_CATEGORY:
            return {...state, productSameCategory: action.productSameCategory};
        case Types.ALL_PRODUCT:
            return {...state, allProduct: action.allProduct};
        default: return {...state};
    }
};

export default productsV2;