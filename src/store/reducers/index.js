import { combineReducers } from "redux";
import user from "./user";

const appReducer = combineReducers({
  user,
});

const rootReducer = (state, action) => {
  console.log(state);
  if (action.type === "USER_LOGOUT") {
    console.log("user logout");
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
