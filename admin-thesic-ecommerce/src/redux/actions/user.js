import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { actShowLoading, actHiddenLoading } from "./loading";

export const actFetchUsersRequest = (token, offset) => {
  const newOffset = offset === null || offset === undefined ? 0 : offset;
  const limit = 10;
  return (dispatch) => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(
        `users?limit=${limit}&offset=${newOffset}&orderBy=-createdAt&filter={"role.nameRole": "user"}`,
        "GET",
        null,
        token
      )
        .then((res) => {
          if (res && res.status === 200) {
            dispatch(actFetchUsers(res.data.results));
            resolve(res.data);
            setTimeout(function () {
              dispatch(actHiddenLoading());
            }, 200);
          }
        })
        .catch((err) => {
          reject(err);
          setTimeout(function () {
            dispatch(actHiddenLoading());
          }, 200);
        });
    });
  };
};

export const actFetchUsers = (users) => {
  return {
    type: Types.FETCH_USERS,
    users,
  };
};

export const actFindUsersRequest = (token, searchText, filter) => {
  return (dispatch) => {
    dispatch(actShowLoading());

    return new Promise((resolve, reject) => {
      // Kiểm tra nếu searchText tồn tại và không rỗng
      const searchQuery = searchText ? `q=${encodeURIComponent(searchText)}` : '';

      // Kiểm tra nếu filter tồn tại và không rỗng
      const filterQuery = filter ? `filter={"role.nameRole": "${filter}"}` : '';

      // Tạo URL dựa trên việc có searchText và filter
      let url = "users";

      if (searchQuery && filterQuery) {
        // Nếu có cả searchText và filter
        url += `?${searchQuery}&${filterQuery}`;
      } else if (searchQuery) {
        // Nếu chỉ có searchText
        url += `?${searchQuery}`;
      } else if (filterQuery) {
        // Nếu chỉ có filter
        url += `?${filterQuery}`;
      }

      callApi(url, "GET", null, token)
        .then((res) => {
          if (res && res.status === 200) {
            dispatch(actFindUsers(res.data.results));
            resolve(res.data);
            setTimeout(() => {
              dispatch(actHiddenLoading());
            }, 200);
          }
        })
        .catch((err) => {
          reject(err);
          setTimeout(() => {
            dispatch(actHiddenLoading());
          }, 200);
        });
    });
  };
};


export const actFindUsers = (users) => {
  return {
    type: Types.FIND_USERS,
    users,
  };
};

export const actDeleteUserRequest = (id, token) => {
  return async (dispatch) => {
    await callApi(`users/${id}`, "DELETE", null, token);
    dispatch(actDeleteUser(id));
  };
};

export const actDeleteUser = (id) => {
  return {
    type: Types.REMOVE_USER,
    id,
  };
};

export const actAddUserRequest = (token, data) => {
  return async (dispatch) => {
    const res = await callApi("users", "POST", data, token);
    if (res && res.status === 200) {
      toast.success("Thêm mới thành công");
      dispatch(actAddUser(res.data));
    }
  };
};

export const actAddUser = (data) => {
  return {
    type: Types.ADD_USER,
    data,
  };
};

export const actGetUserRequest = (token, id) => {
  return async (dispatch) => {
    await callApi(`users/${id}`, "GET", null, token);
  };
};

export const actEditUserRequest = (token, id, data) => {
  return async (dispatch) => {
    const res = await callApi(`users/${id}`, "PUT", data, token);
    if (res && res.status === 200) {
      await dispatch(actEditUser(res.data));
      toast.success("Chỉnh sửa thành công");
    }
  };
};

export const actEditUser = (data) => {
  return {
    type: Types.EDIT_USER,
    data,
  };
};
