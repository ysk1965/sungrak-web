import { api } from "./client";
import type {
  Sermon,
  SermonLatestResponse,
  PaginatedData,
  PlaylistType,
} from "@/types";

export interface SermonQueryParams {
  page?: number;
  size?: number;
  playlist?: PlaylistType;
  search?: string;
}

export const sermonService = {
  // 설교 목록 조회
  getSermons: (params?: SermonQueryParams) =>
    api.get<PaginatedData<Sermon>>("/sermons", params),

  // 최신 설교 조회 (메인페이지용)
  getLatestSermons: () => api.get<SermonLatestResponse>("/sermons/latest"),

  // 설교 상세 조회
  getSermon: (id: string) => api.get<Sermon>(`/sermons/${id}`),

  // 설교 동기화 (관리자)
  syncSermons: (playlist?: PlaylistType) =>
    api.post<{ added: number; updated: number }>("/admin/sermons/sync", {
      playlist,
    }),
};
