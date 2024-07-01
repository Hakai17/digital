import axios from "axios";
import { convertPayloadKeys } from "payload-transformer";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  headers: {
    "Content-type": "application/json",
  },
  transformResponse: data => {
    return data ? convertPayloadKeys(JSON.parse(data), "camelCase") : null;
  },
});

export const get = async url => {
  const { data } = await api.get(url);
  return data;
};

export const post = async (url, json, config = null) => {
  const { data } = await api.post(url, json, config);
  return data;
};

export const normalizePagination = data =>
  data?.pages.flatMap(page => page.data.map(entity => entity));
