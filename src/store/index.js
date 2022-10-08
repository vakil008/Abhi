import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "@redux-devtools/extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const persistConfig = {
  key: "persist-root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, composedEnhancer);
const persistor = persistStore(store);

export { store, persistor };
