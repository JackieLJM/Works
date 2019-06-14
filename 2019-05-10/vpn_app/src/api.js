const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};
export const post = (url, data) => {
  return fetch(url, { method: "post", body: data })
    .then(checkStatus)
    .then(res => res.json());
};
export const get = url => {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json());
};
