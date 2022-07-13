import Cookies from "js-cookie";
import {
  postRequest,
  getRequest,
  pathRequest,
  setToken,
  checkToken,
} from "../../utils/api";
import {
  SET_IS_LOADING,
  SET_USER,
  SET_IS_LOGGED_IN,
  ISetIsLoading,
  ISetUser,
  ISetIsLoggedIn,
} from "../../types/state/user";
import { IUser } from "../../types";
import { AppThunk, AppDispatch } from "../../types/state/state";

const setIsLoading = (payload: boolean): ISetIsLoading => ({
  type: SET_IS_LOADING,
  payload,
});

const setUser = (payload: IUser | null): ISetUser => ({
  type: SET_USER,
  payload,
});

const setIsLoggedIn = (payload: boolean): ISetIsLoggedIn => ({
  type: SET_IS_LOGGED_IN,
  payload,
});

export const forgotPassword: AppThunk =
  (data, callback) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsLoading(true));
      const res = await postRequest("password-reset", data);
      callback(res.success);
    } catch (error) {
      console.error("forgotPassword error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const resetPassword: AppThunk =
  (data, callback) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsLoading(true));
      const res = await postRequest("password-reset/reset", data);
      callback(res.success);
    } catch (error) {
      console.error("resetPassword error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const register: AppThunk =
  (data, callback) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsLoading(true));
      const res = await postRequest("auth/register", data);
      if (res.success) {
        setToken(res);
        dispatch(setUser(res.user));
        dispatch(setIsLoggedIn(true));
      }
      callback(res.success);
    } catch (error) {
      console.error("register error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const login: AppThunk =
  (data, callback) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsLoading(true));
      const res = await postRequest("auth/login", data);
      if (res.success) {
        setToken(res);
        dispatch(setUser(res.user));
        dispatch(setIsLoggedIn(true));
      }
      callback(res.success);
    } catch (error) {
      console.error("login error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const logout: AppThunk = callback => async (dispatch: AppDispatch) => {
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
    console.error("logout error", error);
  }
};

export const getUser: AppThunk = callback => async (dispatch: AppDispatch) => {
  try {
    await checkToken();
    const res = await getRequest("auth/user");
    if (res.success) {
      dispatch(setUser(res.user));
      callback(res);
    }
  } catch (error) {
    console.error("getUser error", error);
  }
};

export const updateUser: AppThunk = data => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    await checkToken();
    const res = await pathRequest("auth/user", data);
    if (res.success) {
      dispatch(setUser(res.user));
    }
  } catch (error) {
    console.error("updateUser error", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const autoLogin: AppThunk = () => async (dispatch: AppDispatch) => {
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
    console.error("checkToken error", error);
  }
};
