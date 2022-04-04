import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:81",
  responseType: "json",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const api = ({ url, requestType, params }) => {
  let promesa;
  switch (requestType) {
    case "GET":
      promesa = API.get(url, { params: params });
      break;
    case "POST":
      promesa = API.post(url, params);
      break;
    case "DELETE":
      promesa = API.delete(url);
      break;
    default:
      return;
  }
  return promesa;
};
