/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "../config/index";
import { storageService } from "../services";
import { ApiValidateExeption, isApiError, isErrorStatus } from "../helpers";
import { ApiExeption } from "../exeptions";
import { getDataFromApiError } from "../helpers/api.helpers";

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  },
  timeout: 180000,
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = storageService.get("accessToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
  } catch (e) {
    console.log(e);
  }
  return config;
});

const requestAccessToken = async () => {
  const response = await axiosInstance.post("/admin/auth/refresh-token", {
    refreshToken: storageService.get("refreshToken"),
  });
  storageService.set("accessToken", response.data.accessToken);
  storageService.set("refreshToken", response.data.refreshToken);
};

const request = async <T>(func: any): Promise<AxiosResponse<T>> => {
  try {
    const response = await func();
    return response as any as AxiosResponse;
  } catch (e: any) {
    if (isErrorStatus(e, 401)) {
      await requestAccessToken();
      return (await func()) as any as AxiosResponse;
    }
    if (isApiError(e)) {
      const exeption = ApiExeption.fromAxiosError(e);
      if (exeption.key === "accessTokenDeprecation") {
        console.log("accessTokenDeprecation");
      } else throw exeption;
    }
    if (isErrorStatus(e, 400)) {
      throw new ApiValidateExeption(getDataFromApiError(e));
    }
    throw e;
  }
};

export const http = {
  get: <T>(url: string, params?: AxiosRequestConfig) =>
    request<T>(() => axiosInstance.get<T>(url, params)),

  post: <T>(url: string, data: any, params?: AxiosRequestConfig) =>
    request<T>(() => axiosInstance.post<T>(url, data, params)),

  put: <T>(url: string, data: any, params?: AxiosRequestConfig) =>
    request<T>(() => axiosInstance.put<T>(url, data, params)),

  patch: <T>(url: string, data: any, params?: AxiosRequestConfig) =>
    request<T>(() => axiosInstance.patch<T>(url, data, params)),

  delete: <T>(url: string, params?: AxiosRequestConfig) =>
    request<T>(() => axiosInstance.delete<T>(url, params)),
};
