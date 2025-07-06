import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FIND_USER_BY_ID_REQUEST,
  FIND_USER_BY_ID_SUCCESS,
  FIND_USER_BY_ID_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
} from "./ActionType";

const initialState = {
  user: null,
  error: null,
  loading: false,
  jwt: null,
  updatedUser: null,
  foundUser: null,
  followedUser: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔷 Common Request
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case FIND_USER_BY_ID_REQUEST:
    case FOLLOW_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // 🔷 Success
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        jwt: action.payload,
        loading: false,
        error: null,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    // case UPDATE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     updatedUser: action.payload,
    //     loading: false,
    //     error: null,
    //   };

    case FIND_USER_BY_ID_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        foundUser: action.payload,
        loading: false,
        error: null,
      };

    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        followedUser: action.payload,
        loading: false,
        error: null,
      };

    // 🔷 Failure
    case LOGIN_USER_FAILURE:
    case REGISTER_USER_FAILURE:
    case GET_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case FIND_USER_BY_ID_FAILURE:
    case FOLLOW_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // 🔷 Logout
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
