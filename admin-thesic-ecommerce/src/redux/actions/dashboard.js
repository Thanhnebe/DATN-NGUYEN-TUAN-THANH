import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { actShowLoading, actHiddenLoading } from './loading'
export const actFetchDashboardRequest = (token, startDate, endDate) => {
  return async dispatch => {
    dispatch(actShowLoading());
      const res = await callApi(`dashboards/revenues?startDate=${startDate}&endDate=${endDate}`, 'GET', null, token);
      if (res && res.status === 200) {
        dispatch(actFetchDashboard(res.data));
      }
      setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
  };
}

export const actFetchDashboardTopSellingRequest = (token, time) => {
  return async dispatch => {
    dispatch(actShowLoading());
      const res = await callApi(`dashboards/products?time=${time}&type=topSelling`, 'GET', null, token);
      if (res && res.status === 200) {
        dispatch(actFetchDashboardTopSelling(res.data));
      }
      setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
  };
}
export const actFetchDashboardTopNotSellingRequest = (token, time) => {
  return async dispatch => {
    dispatch(actShowLoading());
      const res = await callApi(`dashboards/products?time=${time}&type=topNotSelling`, 'GET', null, token);
      if (res && res.status === 200) {
        dispatch(actFetchDashboardTopNotSelling(res.data));
      }
      setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
  };
}

export const actFetchDashboard = (data) => {
  return {
      type : Types.FETCH_DASHBOARD,
      data
  }
}
export const actFetchDashboardTopSelling = (data) => {
  return {
      type : Types.FETCH_DASHBOARD_TOP_SELLING,
      data
  }
}
export const actFetchDashboardTopNotSelling = (data) => {
  return {
      type : Types.FETCH_DASHBOARD_TOP_NOT_SELLING,
      data
  }
}
