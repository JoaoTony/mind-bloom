import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";

import { router } from "expo-router";
import { USER_ACCESS_TOKEN } from "@/constants";

const baseURL = "https://mindbloom-8qpx.onrender.com";

type Method = "get" | "post" | "put" | "patch";
type GenericResponse<T = any> = { data: T | undefined; statusCode: number };

let apiInstance: AxiosInstance | null = null;

export const initAPI = async () => {
  const token = await SecureStore.getItemAsync(USER_ACCESS_TOKEN);

  apiInstance = axios.create({
    baseURL,
    timeout: 100000,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401 && token) {
        console.log("Token expirado. Redirecionando para login.");
        await SecureStore.deleteItemAsync(USER_ACCESS_TOKEN)
        router.replace("/");
      }
      return Promise.reject(error);
    }
  );

  return apiInstance;
};

const ensureAPI = (): AxiosInstance => {
  if (!apiInstance) {
    throw new Error("API não inicializada. Chame initAPI() antes.");
  }
  return apiInstance;
};

const request = (method: Method) => {
  return async <T = any>(
    url: string,
    data?: any,
    isLoading?: (loading: boolean) => void,
    config?: AxiosRequestConfig
  ): Promise<GenericResponse<T>> => {
    const api = ensureAPI();
    const result: GenericResponse<T> = {
      data: undefined,
      statusCode: 0,
    };

    isLoading?.(true);

    try {
      const response =
        method === "get"
          ? await api.get(url, config)
          : await api[method](url, data, config);

      result.data = response.data;
      result.statusCode = response.status;
    } catch (err: any) {
      const response = err?.response
      console.error("Erro ao chamar API:", err, response?.data);
      result.statusCode = err?.response?.status || 500;
    } finally {
      isLoading?.(false);
    }

    return result;
  };
};

export const API = {
  get: request("get"),
  post: request("post"),
  put: request("put"),
  patch: request("patch"),
};
