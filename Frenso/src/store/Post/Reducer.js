import {
  FIND_POST_BY_ID_REQUEST,
  FIND_POST_BY_ID_SUCCESS,
  FIND_POST_BY_ID_FAILURE,
  GET_ALL_POSTS_SUCCESS,
  GET_USER_POSTS_SUCCESS,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  POST_CREATE_FAILURE,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  RE_POST_REQUEST,
  RE_POST_SUCCESS,
  RE_POST_FAILURE,
  REPLY_POST_SUCCESS,
  USER_LIKE_POST_REQUEST,
  USER_LIKE_POST_SUCCESS,
  USER_LIKE_POST_FAILURE,
} from "./ActionType";

const initialState = {
  posts: [],
  post: null,
  likedPosts: [],
  like: null,
  repost: null,
  loading: false,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // Requests
    case POST_CREATE_REQUEST:
    case POST_DELETE_REQUEST:
    case USER_LIKE_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case RE_POST_REQUEST:
    case FIND_POST_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Failures
    case POST_CREATE_FAILURE:
    case POST_DELETE_FAILURE:
    case USER_LIKE_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case RE_POST_FAILURE:
    case FIND_POST_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Successes
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
        error: null,
      };

    case GET_ALL_POSTS_SUCCESS:
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };

    case USER_LIKE_POST_SUCCESS:
      return {
        ...state,
        likedPosts: action.payload,
        loading: false,
        error: null,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        like: action.payload,
        loading: false,
        error: null,
      };

    case POST_DELETE_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        loading: false,
        error: null,
      };

    case RE_POST_SUCCESS:
      return {
        ...state,
        repost: action.payload,
        loading: false,
        error: null,
      };

    case FIND_POST_BY_ID_SUCCESS:
    case REPLY_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default postReducer;
