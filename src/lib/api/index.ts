export { api, apiClient } from "./client";
export { sermonService } from "./sermons";
export { noticeService } from "./notices";

import { api } from "./client";
import type {
  Worship,
  ChurchInfo,
  LiveStream,
  NewcomerInquiry,
  CreateNewcomerInquiryRequest,
  LoginRequest,
  LoginResponse,
  Admin,
} from "@/types";

// 예배 정보
export const worshipService = {
  getWorships: () => api.get<Worship[]>("/worships"),
};

// 교회 소개
export const churchInfoService = {
  getChurchInfo: () => api.get<ChurchInfo>("/church-info"),
};

// 라이브 스트림
export const liveStreamService = {
  getLiveStream: () => api.get<LiveStream>("/livestream"),
  updateLiveStream: (data: Partial<LiveStream>) =>
    api.put<LiveStream>("/admin/livestream", data),
};

// 새가족 문의
export const newcomerService = {
  submitInquiry: (data: CreateNewcomerInquiryRequest) =>
    api.post<{ id: string; message: string }>("/newcomer-inquiries", data),
  getInquiries: (params?: { status?: string; page?: number; size?: number }) =>
    api.get<NewcomerInquiry[]>("/admin/newcomer-inquiries", params),
};

// 인증
export const authService = {
  login: (data: LoginRequest) => api.post<LoginResponse>("/auth/login", data),
  logout: () => api.post<void>("/auth/logout"),
  getMe: () => api.get<Admin>("/auth/me"),
  refresh: (refreshToken: string) =>
    api.post<LoginResponse>("/auth/refresh", { refreshToken }),
};
