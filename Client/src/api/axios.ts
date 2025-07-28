import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tasky-app-zy17.onrender.com/api",
  withCredentials: true,
});
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:4650",
//   withCredentials: true,
// });

export default axiosInstance;
