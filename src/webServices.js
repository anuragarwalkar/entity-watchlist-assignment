export const getEnvironment = () => ({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  apikey: process.env.NEXT_PUBLIC_API_KEY,
  WSUrl: process.env.NEXT_PUBLIC_WS_BASE_URL,
});

export const generateWSMessage = (symbols, isSubscribe = true) => {
  return {
    "action": isSubscribe ? "subscribe" : "unsubscribe", 
    "params": {
      "symbols": symbols
    }
  };
}

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

export const getWebSocketURL = (path) => {
  const { WSUrl, apikey } = getEnvironment();

  return `${WSUrl}/v1/${path}?apikey=${apikey}`;
}


