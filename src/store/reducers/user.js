import ActionTypes from "../constants";

const initialState = {
  userID: "",
  userLogin: "",
  loginToken: "",
  userData: {},
  facilityid: "",
};

const User = (state = initialState, action) => {
  console.log(action.type, "", action.payload);
  switch (action.type) {
    case ActionTypes.STORE_USER_DETAIL:
      const { userLogin, userID, userData } = action.payload;
      console.log("user detil in redux", action.payload);
      return Object.assign({}, state, {
        userLogin,
        userID,

        userData,
      });

    case ActionTypes.SET_USER_TOKEN:
      console.log("User Token saved", action.payload);
      return Object.assign({}, state, {
        loginToken: action.payload,
      });

    case ActionTypes.STORE_USER_FACILITY:
      console.log("User facilityid saved", action.payload);
      return Object.assign({}, state, {
        facilityid: action.payload,
      });

    // case ActionTypes.SET_NOTIFICATION_COUNTER:
    //   console.log("counter of notification", action.payload);
    //   return Object.assign({}, state, {
    //     notificationCounter: action.payload,
    //   });

    default:
      return state;
  }
};

export default User;
