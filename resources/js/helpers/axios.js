import cookie from "./cookie";

const token = cookie.getCookie("access_token");

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 10000,
  headers: { Authorization: "Bearer " + token },
});

export default axiosInstance;
