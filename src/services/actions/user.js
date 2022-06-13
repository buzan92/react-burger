import Cookies from "js-cookie";
import { postRequest, getRequest, pathRequest, setToken, checkToken } from "../../utils/api";

export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_USER = "SET_USER";
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";

const setIsLoading = payload => ({ type: SET_IS_LOADING, payload });
const setUser = payload => ({ type: SET_USER, payload });
const setIsLoggedIn = payload => ({ type: SET_IS_LOGGED_IN, payload });

export const forgotPassword = (data, callback) => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    const res = await postRequest("password-reset", data);
    callback(res.success);
  } catch(error) {
    console.error('forgotPassword error', error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const resetPassword = (data, callback) => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    const res = await postRequest("password-reset/reset", data);
    callback(res.success);
  } catch(error) {
    console.error('resetPassword error', error);
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
      dispatch(setIsLoggedIn(true));
    }
    callback(res.success);
  } catch(error) {
    console.error('register error', error);
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
      dispatch(setIsLoggedIn(true));
    }
    callback(res.success);
  } catch(error) {
    console.error('login error', error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const logout = callback => async dispatch => {
  try {
    const token = Cookies.get("refreshToken");
    const res = await postRequest("auth/logout", { token });
    if (res.success) {
      dispatch(setUser(null));
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(setIsLoggedIn(false));
    }
    callback(res.success);
  } catch (error) {
    console.error('logout error', error);
  }
};

export const getUser = callback => async dispatch => {
  try {
    await checkToken();
    const res = await getRequest("auth/user");
    if (res.success) {
      dispatch(setUser(res.user));
      callback(res);
    }
  } catch (error) {
    console.error('getUser error', error);
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
  } catch (error) {
    console.error('updateUser error', error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const autoLogin = () => async dispatch => {
  const token = Cookies.get("refreshToken");
  if (!token) {
    return;
  }
  try {
    const res = await postRequest("auth/token", { token });
    if (res.success) {
      setToken(res);
      dispatch(setIsLoggedIn(true));
    }
  } catch (error) {
    console.error('checkToken error', error);
  }
}