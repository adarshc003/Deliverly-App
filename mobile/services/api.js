import axios from "axios";

const API = axios.create({
  baseURL: "https://deliverly-app.onrender.com/api",
});

export default API;