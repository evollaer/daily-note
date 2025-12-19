import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 用于存储请求的 Map
const pendingRequests = new Map<string, AbortController>();

// 生成请求的唯一标识
const getRequestKey = (config: AxiosRequestConfig): string => {
  return `${config.method}:${config.url}`;
};

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 替换为你的 API 基础 URL
  timeout: 50000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const requestKey = getRequestKey(config);

  // 如果存在相同的请求，则取消上一次请求
  if (pendingRequests.has(requestKey)) {
    const controller = pendingRequests.get(requestKey);
    controller?.abort(); // 取消上次请求
    pendingRequests.delete(requestKey); // 从 Map 中移除
  }

  // 为当前请求创建一个新的 AbortController
  const controller = new AbortController();
  config.signal = controller.signal;

  // 将当前请求存储到 Map 中
  pendingRequests.set(requestKey, controller);

  return config;
});

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const requestKey = getRequestKey(response.config);
    pendingRequests.delete(requestKey); // 请求完成后移除
    return response.data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.warn("Request canceled:", error.message);
    } else {
      const requestKey = getRequestKey(error.config);
      pendingRequests.delete(requestKey); // 请求完成后移除
      console.error("API Error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;