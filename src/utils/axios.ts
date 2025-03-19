import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: undefined });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------
export const fetcherGet = async (microBaseUrl: string | null, url: string, headers: any = {}) => {
  if (microBaseUrl) {
    axiosInstance.defaults.baseURL = getBaseUrl(microBaseUrl);
  }
  return axiosInstance.get(url, {
    headers,
    withCredentials: false,
  });
};

export const fetcherPost = async (
  microBaseUrl: string | null,
  url: string,
  body: any,
  headers: any,
  auth?: any
) => {
  if (microBaseUrl) {
    axiosInstance.defaults.baseURL = getBaseUrl(microBaseUrl);
  }
  const pos = await axiosInstance.post(url, body, { headers, auth });
  return pos;
};

export const fetcherDelete = async (
  microBaseUrl: string | null,
  url: string,
  headers: any = {}
) => {
  if (microBaseUrl) {
    axiosInstance.defaults.baseURL = getBaseUrl(microBaseUrl);
  }
  return axiosInstance.delete(url, {
    headers: {
      ...headers,
      auth: sessionStorage.getItem("accessToken") ? `Bearer ${sessionStorage.getItem("accessToken")}` : "",
    },
  });
};

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const getBaseUrl = (type: string) => {
  if (type === 'HOST_BASE_URL') {
    return HOST_API;
  }
  return HOST_API;
}

export enum BaseUrlTypes {
  ENUM_HOST_BASE_URI = 'HOST_BASE_URL'
}

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/signup',
  },
  user:'/users', 

  employee: '/employees',
  employeeId: (id: string) => `/employees/${id}`,

  task: '/tasks',
  taskId: (id: string) => `/tasks/${id}`,

  order: '/orders',
  orderId: (id: string) => `/orders/${id}`,

  product: '/products',
  productId: (id: string) => `/products/${id}`,
};
