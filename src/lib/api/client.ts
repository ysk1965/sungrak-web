import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { ApiError, ApiResponse } from "@/types";

// API 모드 확인 (mock / real)
const API_MODE = process.env.NEXT_PUBLIC_API_MODE || "mock";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_MODE === "mock" ? "/api/v1" : `${API_URL}/api/v1`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request 인터셉터 - 토큰 자동 첨부
apiClient.interceptors.request.use(
  (config) => {
    // 브라우저 환경에서만 localStorage 접근
    if (typeof window !== "undefined") {
      const authData = localStorage.getItem("sungrak_auth");
      if (authData) {
        try {
          const { accessToken } = JSON.parse(authData);
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } catch {
          // 파싱 실패 시 무시
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiError>) => {
    const status = error.response?.status;

    // 401 에러 - 토큰 만료
    if (status === 401 && typeof window !== "undefined") {
      // 토큰 갱신 시도 또는 로그아웃
      localStorage.removeItem("sungrak_auth");
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

// API 헬퍼 함수
export const api = {
  get: <T>(url: string, params?: object) =>
    apiClient.get<ApiResponse<T>>(url, { params }).then((res) => res.data),

  post: <T>(url: string, data?: object) =>
    apiClient.post<ApiResponse<T>>(url, data).then((res) => res.data),

  put: <T>(url: string, data?: object) =>
    apiClient.put<ApiResponse<T>>(url, data).then((res) => res.data),

  delete: <T>(url: string) =>
    apiClient.delete<ApiResponse<T>>(url).then((res) => res.data),
};
