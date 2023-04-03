import axios from "axios";

let authToken = localStorage.getItem("authToken")
  ? JSON.parse(localStorage.getItem("authToken"))
  : sessionStorage.getItem("authToken")
  ? JSON.parse(sessionStorage.getItem("authToken"))
  : "";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: authToken ? authToken : "",
  },
});

axiosInstance.interceptors.request.use(
  function (req) {
    if (!authToken)
      authToken = localStorage.getItem("authToken")
        ? JSON.parse(localStorage.getItem("authToken"))
        : sessionStorage.getItem("authToken")
        ? JSON.parse(sessionStorage.getItem("authToken"))
        : "";
    req.headers.Authorization = authToken ? authToken : "";
    return req;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;

//pratiksha@gmail.com  -- Pratiksha@11
//pranali@gmail.com -- Pranali@6
//arush@gmail.com -- Arush@11
