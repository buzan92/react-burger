const API_URL = "https://norma.nomoreparties.space/api/";

const handleResponse = response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};

const handleError = error => {
  console.error(error);
};

export const getRequest = async route => {
  return await fetch(`${API_URL}${route}`)
    .then(handleResponse)
    .catch(handleError);
};

export const postRequest = async (route, data) => {
  return await fetch(`${API_URL}${route}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .catch(handleError);
};
