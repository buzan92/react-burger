const API_URL = 'https://norma.nomoreparties.space/api/';

export const getData = async(route) => {
  return await fetch(`${API_URL}${route}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.status);
    })
    .catch(error => console.error(error));
}