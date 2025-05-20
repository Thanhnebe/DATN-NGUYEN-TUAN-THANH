import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import "react-toastify/dist/ReactToastify.css";
import { actShowLoading, actHiddenLoading } from "./loading";

export const actFetchTransactionsRequest = (token, offset) => {
  const newOffset = offset === null || offset === undefined ? 0 : offset;
  const limit = 10;
  return (dispatch) => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(
        `transaction?limit=${limit}&offset=${newOffset}&orderBy=-createdAt`,
        "GET",
        null,
        token
      )
        .then((res) => {
          dispatch(actFetchTransactions(res.data.results));
          resolve(res.data);
          setTimeout(function () {
            dispatch(actHiddenLoading());
          }, 200);
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

export const actFetchTransactions = (ratings) => {
  return {
    type: Types.FETCH_TRANSACTIONS,
    ratings,
  };
};

export const actFindTransactionsRequest = (token, searchText) => {
  return (dispatch) => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      if (
        searchText !== undefined &&
        searchText !== null &&
        searchText !== ""
      ) {
        callApi(`transaction?q=${searchText}`, "GET", null, token)
          .then((res) => {
            if (res && res.status === 200) {
              dispatch(actFindTransactions(res.data.results));
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
      } else {
        callApi("transaction", "GET", null, token)
          .then((res) => {
            if (res && res.status === 200) {
              dispatch(actFindTransactions(res.data.results));
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
      }
    });
  };
};

export const actFindTransactions = (transactions) => {
  return {
    type: Types.FIND_TRANSACTIONS,
    transactions,
  };
};

