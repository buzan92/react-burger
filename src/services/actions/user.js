import Cookies from "js-cookie";
import { postRequest, getRequest, pathRequest, setToken, checkToken } from "../../utils/api";

export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_USER = "SET_USER";

const setIsLoading = payload => ({ type: SET_IS_LOADING, payload });
const setUser = payload => ({ type: SET_USER, payload });

export const forgotPassword = (data, callback) => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    const res = await postRequest("password-reset", data);
    callback(res.success);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const resetPassword = (data, callback) => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    const res = await postRequest("password-reset/reset", data);
    callback(res.success);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const register = (data, callback) => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    const res = await postRequest("auth/register", data);
    if (res.success) {
      setToken(res);
      dispatch(setUser(res.user));
    }
    callback(res.success);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const login = (data, callback) => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    const res = await postRequest("auth/login", data);
    if (res.success) {
      setToken(res);
      dispatch(setUser(res.user));
    }
    callback(res.success);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const logout = callback => async dispatch => {
  const token = Cookies.get("refreshToken");
  const res = await postRequest("auth/logout", { token });
  if (res.success) {
    dispatch(setUser(null));
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }
  callback(res.success);
};

export const getUser = callback => async dispatch => {
  await checkToken();
  const res = await getRequest("auth/user");
  if (res.success) {
    dispatch(setUser(res.user));
    callback(res);
  }
};

export const updateUser = data => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    await checkToken();
    const res = await pathRequest("auth/user", data);
    if (res.success) {
      dispatch(setUser(res.user));
    }
  } finally {
    dispatch(setIsLoading(false));
  }
};
