import axios from "axios";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router";
import { loginData } from "../constant";

// axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
    Authorization: loginData ? loginData?.token : "",
  },
});

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = (request) => {
      if (loginData) {
        request.headers.Authorization = `Bearer ${loginData?.token}`;
      }
      return request;
    };

    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error) => {
      console.log("errInterceptor == ", error);
      if (error.response.status === 401) {
        secureLocalStorage.clear();
        navigate("/login");
      }
      if (error.response.status === 400) {
        return error;
      }
    };

    const requestInterceptor = instance.interceptors.request.use(
      reqInterceptor,
      errInterceptor
    );
    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );
    return () => {
      instance.interceptors.response.eject(interceptor);
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
