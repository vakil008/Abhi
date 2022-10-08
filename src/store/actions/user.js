import ActionTypes from "../constants";

export const storeUserDetail = (param) => ({
  type: ActionTypes.STORE_USER_DETAIL,
  payload: param,
});

export const userLogout = () => ({
  type: ActionTypes.USER_LOGOUT,
});

export const setNotificationCounter = (param) => ({
  type: ActionTypes.SET_NOTIFICATION_COUNTER,
  payload: param,
});

export const setUserToken = (param) => ({
  type: ActionTypes.SET_USER_TOKEN,
  payload: param,
});

export const setUserFacility = (param) => ({
  type: ActionTypes.STORE_USER_FACILITY,
  payload: param,
});
