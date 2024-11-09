import axios from "axios";

// Create an instance of meet
const meet = axios.create({
  timeout: 1000,
});

// Add a request interceptor
// meet.interceptors.request.use(
//   (config) => {
//     // Add authorization token to headers before the request is sent
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
meet.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status === 401) {
      // Handle unauthorized access
      // console.error("401 Unauthorized access, 로그인 페이지로 이동합니다.");
      // window.location.href = "/login";
      const currentLocation = window.location.pathname;
      if (
        currentLocation !== "/login" &&
        currentLocation !== "/login/local" &&
        currentLocation !== "/register"
      ) {
        console.error("401 Unauthorized access, 로그인 페이지로 이동합니다.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default meet;
