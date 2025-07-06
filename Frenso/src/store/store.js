import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import postReducer from "./Post/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
