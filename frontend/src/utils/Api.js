import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4062",
  responseType: "json",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default function api({ url, requestType, params = {} }) {
  let promise;
  switch (requestType) {
    case "GET":
      promise = API.get(url, { params: params });
      break;
    case "POST":
      promise = API.post(url, params);
      break;
    case "PUT":
      promesa = API.put(url, params);
      break;
    case "DELETE":
      promesa = API.delete(url, { data: params });
      break;
    default:
      console.warn("Unsupported request type");
      return;
  }
  return promise;
}
