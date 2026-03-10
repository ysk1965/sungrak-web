import { api } from "./client";
import type {
  Notice,
  PaginatedData,
  NoticeCategory,
  CreateNoticeRequest,
} from "@/types";

export interface NoticeQueryParams {
  page?: number;
  size?: number;
  category?: NoticeCategory;
}

export const noticeService = {
  // 공지사항 목록 조회
  getNotices: (params?: NoticeQueryParams) =>
    api.get<PaginatedData<Notice>>("/notices", params),

  // 공지사항 상세 조회
  getNotice: (id: string) => api.get<Notice>(`/notices/${id}`),

  // 공지사항 생성 (관리자)
  createNotice: (data: CreateNoticeRequest) =>
    api.post<Notice>("/admin/notices", data),

  // 공지사항 수정 (관리자)
  updateNotice: (id: string, data: Partial<CreateNoticeRequest>) =>
    api.put<Notice>(`/admin/notices/${id}`, data),

  // 공지사항 삭제 (관리자)
  deleteNotice: (id: string) => api.delete<void>(`/admin/notices/${id}`),
};
