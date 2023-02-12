import { getEnvironment } from "./utils/util.functions";

export const fetchData = (path, params = {}) => {
    const { baseUrl, apikey } = getEnvironment();

    const query = new URLSearchParams({
      ...params,
      apikey,
    });

    return fetch(
      `${baseUrl}/${path}?${query}`
    );
}

export const postData = (path, body = {}) => {
  const { baseUrl, apikey } = getEnvironment();

  const query = new URLSearchParams({
    apikey,
  });

  return fetch(
    `${baseUrl}/${path}?${query}`, {
      body: JSON.stringify(body),
      method: 'POST'
    }
  );
}


