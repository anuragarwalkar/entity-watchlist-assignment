import { METHODS_QUOTE } from "./constant";

export const getEnvironment = () => ({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  apikey: process.env.NEXT_PUBLIC_API_KEY,
});

export const generateSymbolArray = (items) => {
  return items.map((i) => `${i.symbol}:${i.exchange}:${i.country}`);
};

export const mergeComplexData = (data) => {
  const merged = [];
  const j = METHODS_QUOTE.length;
  for (let i = 0; i < j; i++) {
    merged.push({ ...data[i], ...data[j]});
  }
  return merged;
};
