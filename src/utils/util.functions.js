import { METHODS_QUOTE } from "./constant";
import { v4 as uuidv4 } from "uuid";

export const generateSymbolArray = (items) => {
  return items.map((i) => `${i.symbol}:${i.exchange}:${i.country}`);
};

export const mergeComplexData = (data, meta) => {
  const merged = [];
  const j = data.length / METHODS_QUOTE.length;
  for (let i = 0; i < j; i++) {
    merged.push({ ...data[i], ...data[j], id: uuidv4().toString(), meta });
  }
  return merged;
};
