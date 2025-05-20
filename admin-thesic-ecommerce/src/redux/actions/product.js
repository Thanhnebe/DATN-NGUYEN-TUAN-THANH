import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { toast } from "react-toastify";
import { actShowLoading, actHiddenLoading } from "./loading";
import "react-toastify/dist/ReactToastify.css";

export const actFetchProductsRequest = (token, offset) => {
  const newOffset = offset === null || offset === undefined ? 0 : offset;
  const limit = 10;
  return (dispatch) => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(
        `products?limit=${limit}&offset=${newOffset}&orderBy=-createdAt`,
        "GET",
        null
      )
        .then((res) => {
          if (res && res.status === 200) {
            dispatch(actFetchProducts(res.data.results));
            resolve(res.data);
            setTimeout(function () {
              dispatch(actHiddenLoading());
            }, 200);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          setTimeout(function () {
            dispatch(actHiddenLoading());
          }, 200);
        });
    });
  };
};

export const actFetchProducts = (products) => {
  return {
    type: Types.FETCH_PRODUCTS,
    products,
  };
};

export const actFindProductsRequest = (token, searchText, filter, status) => {
  return async (dispatch) => {
    dispatch(actShowLoading());

    // Construct the query parameters
    let url = "products";
    let queryParams = [];

    if (searchText) {
      queryParams.push(`q=${searchText}`);
    }

    if (filter) {
      queryParams.push(`filter=${filter}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }
 
    try {
      const res = await callApi(url, "GET", null, token);
      if (res && res.status === 200) {
        dispatch(actFindProducts(res.data.results));
        return res.data;
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setTimeout(() => {
        dispatch(actHiddenLoading());
      }, 200);
    }
  };
};

// export const actFindProductsRequest = (token, searchText, filter) => {
//   return (dispatch) => {
//     dispatch(actShowLoading());
//     return new Promise((resolve, reject) => {
//       if (
//         searchText !== undefined &&
//         searchText !== null &&
//         searchText !== ""
//       ) {
//         callApi(`products?q=${searchText}`, "GET", null, token)
//           .then((res) => {
//             if (res && res.status === 200) {
//               dispatch(actFindProducts(res.data.results));
//               resolve(res.data);
//               setTimeout(function () {
//                 dispatch(actHiddenLoading());
//               }, 200);
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//             reject(err);
//             setTimeout(function () {
//               dispatch(actHiddenLoading());
//             }, 200);
//           });
//       } else {
//         callApi("products", "GET", null, token)
//           .then((res) => {
//             if (res && res.status === 200) {
//               dispatch(actFindProducts(res.data.results));
//               resolve(res.data);
//               setTimeout(function () {
//                 dispatch(actHiddenLoading());
//               }, 200);
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//             reject(err);
//             setTimeout(function () {
//               dispatch(actHiddenLoading());
//             }, 200);
//           });
//       }
//     });
//   };
// };

export const actFindProducts = (products) => {
  return {
    type: Types.FIND_PRODUCTS,
    products,
  };
};

export const actDeleteProductRequest = (id, token) => {
  return async (dispatch) => {
    await callApi(`products/${id}`, "DELETE", null, token);
    dispatch(actDeleteProduct(id));
  };
};

export const actDeleteProduct = (id) => {
  return {
    type: Types.REMOVE_PRODUCT,
    id,
  };
};

export const actAddProductRequest = (token, data) => {
  return async (dispatch) => {
    const res = await callApi("products", "POST", data, token);
    if (res && res.status === 200) {
      toast.success("Thêm sản phẩm thành công");
      dispatch(actAddProduct(res.data));
    }
  };
};

export const actAddProduct = (data) => {
  return {
    type: Types.ADD_PRODUCT,
    data,
  };
};

export const actGetProductRequest = (token, id) => {
  return async (dispatch) => {
    await callApi(`products/${id}`, "GET", null, token);
  };
};

export const actEditProductRequest = (token, id, data) => {
  return async (dispatch) => {
    const res = await callApi(`products/${id}`, "PUT", data, token);
    if (res && res.status === 200) {
      toast.success("Cập nhật thành công");
      dispatch(actEditProduct(res.data));
    }
  };
};

export const actEditProduct = (data) => {
  return {
    type: Types.EDIT_PRODUCT,
    data,
  };
};
