import axios from "axios";
import { getTokenFromAPP } from "../hooks/useToken";
const baseURL = "http://localhost:4500/api/";
const client = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

const wrapperApi = (method, options) => {
  const userInfo = getTokenFromAPP();
  const token = userInfo?.token;
  return client.request({
    method,
    headers: { Authorization: `Bearer ${token ? token : ""}` },
    ...options,
  });
};

export default wrapperApi;
