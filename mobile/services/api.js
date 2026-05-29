import axios from "axios";

const API = axios.create({
  baseURL: "http://10.149.32.60:5000/api",
});

export default API;