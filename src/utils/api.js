import Cookies from "js-cookie";
const API_URL = "https://norma.nomoreparties.space/api/";

const handleResponse = response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};

export const setToken = res => {
  const expires = new Date(new Date().getTime() + 20 * 60 * 1000);
  Cookies.set("accessToken", res.accessToken, { expires });
  Cookies.set("refreshToken", res.refreshToken);
};

export const checkToken = async () => {
  if (Cookies.get("accessToken")) {
    return;
  }
  try {
    const token = Cookies.get("refreshToken");
    const res = await postRequest("auth/token", { token });
    if (res.success) {
      setToken(res);
    }
  } catch (error) {
    console.error('checkToken error', error);
  }
};

export const getRequest = async route => {
  const token = Cookies.get('accessToken');
  return await fetch(`${API_URL}${route}`, {
    headers: {
      authorization: token,
    }
  }).then(handleResponse);
};

export const postRequest = async (route, data) => {
  const token = Cookies.get('accessToken');
  return await fetch(`${API_URL}${route}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then(handleResponse);
};

export const pathRequest = async (route, data) => {
  const token = Cookies.get('accessToken');
  return await fetch(`${API_URL}${route}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then(handleResponse);
};
