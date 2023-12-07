import axios from "axios";
const baseURL = "http://localhost:4500/api/"
const client = axios.create({
  baseURL:baseURL,
  headers: {
    Accept: "application/json",
  },
});

const wrapperApi = (method, options) => {
  let token = "";
  return client.request({
    method,
    headers: { Authorization: `Bearer ${token ? token : ""}` },
    ...options,
  });
};


export default wrapperApi