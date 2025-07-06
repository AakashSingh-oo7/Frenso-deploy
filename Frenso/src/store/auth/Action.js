import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
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
  FIND_USER_BY_ID_SUCCESS,
  FIND_USER_BY_ID_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE
} from "./ActionType";

// 🔷 Login User
export const loginUser = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });

  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    console.log("Login response:", data);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.jwt,
    });
  } catch (error) {
    console.error("Login failed:", error);

    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: error.response ? error.response.data : "Login failed",
    });
  }
};

// 🔷 Register User
export const registerUser = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });

  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
    console.log("Registration response:", data);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.jwt,
    });
  } catch (error) {
    console.error("Registration failed:", error);

    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response ? error.response.data : "Registration failed",
    });
  }
};

// 🔷 Get User Profile
export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Failed to fetch user profile:", error);

    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response ? error.response.data : "Failed to fetch user profile",
    });
  }
};


export const logout = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

    localStorage.removeItem("jwt");
    dispatch({type:LOGOUT, payload: null});

   
};

export const findUserById = (userid) => async (dispatch) => {

  try {
    const { data } = await api.get(`/api/users/${userid}`);
    dispatch({
      type: FIND_USER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Failed to fetch user profile:", error);

    dispatch({
      type: FIND_USER_BY_ID_FAILURE,
      payload: error.response ? error.response.data : "Failed to fetch user profile",
    });
  }
};

export const updateUserProfile = (reqData) => async (dispatch) => {

  try {
    const { data } = await api.put(`/api/users/update`, reqData);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Failed to update user profile:", error);

    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.response ? error.response.data : "Failed to update user profile",
    });
  }
};

export const followUserAction = (userID) => async (dispatch) => {

  try {
    const { data } = await api.put(`/api/users/${userID}/follow`);
    dispatch({
      type: FOLLOW_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Failed to follow user:", error);

    dispatch({
      type: FOLLOW_USER_FAILURE,
      payload: error.response ? error.response.data : "Failed to follow user",
    });
  }
};

