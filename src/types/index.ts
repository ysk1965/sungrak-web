// ===== API Response 공통 =====

export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// ===== 페이지네이션 =====

export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface PaginatedData<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// ===== Admin (관리자) =====

export type AdminRole = "SUPER_ADMIN" | "ADMIN";

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
}

// ===== Sermon (설교) =====

export type PlaylistType = "sunday" | "wednesday" | "dawn";

export interface Sermon {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnailUrl: string;
  playlist: PlaylistType;
  preacher: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SermonLatestResponse {
  featured: Sermon;
  recent: Sermon[];
}

// ===== Notice (공지사항) =====

export type NoticeCategory = "news" | "event" | "weekly";

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  thumbnailUrl?: string;
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// ===== Worship (예배정보) =====

export type DayType =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface Worship {
  id: string;
  name: string;
  day: DayType;
  time: string;
  location: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// ===== ChurchInfo (교회소개) =====

export interface ChurchGreeting {
  title: string;
  content: string;
  pastorName: string;
  pastorImage?: string;
}

export interface ChurchVision {
  title: string;
  content: string;
  values: string[];
}

export interface ChurchHistoryItem {
  year: string;
  content: string;
}

export interface ChurchOrganization {
  content: string;
  chartImage?: string;
}

export interface ChurchLocation {
  address: string;
  phone: string;
  fax?: string;
  email?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ChurchInfo {
  greeting: ChurchGreeting;
  vision: ChurchVision;
  history: ChurchHistoryItem[];
  organization: ChurchOrganization;
  location: ChurchLocation;
}

// ===== LiveStream (라이브) =====

export interface LiveStream {
  isLive: boolean;
  title?: string;
  youtubeId?: string;
  startedAt?: string;
}

// ===== NewcomerInquiry (새가족 문의) =====

export type InquiryStatus = "pending" | "contacted" | "completed";
export type PreferredContact = "phone" | "email" | "kakao";

export interface NewcomerInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  preferredContact: PreferredContact;
  status: InquiryStatus;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// ===== Request DTOs =====

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateNoticeRequest {
  title: string;
  content: string;
  category: NoticeCategory;
  isPinned?: boolean;
  thumbnailUrl?: string;
}

export interface CreateNewcomerInquiryRequest {
  name: string;
  phone: string;
  email?: string;
  message: string;
  preferredContact?: PreferredContact;
}

// ===== Response DTOs =====

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    name: string;
    role: AdminRole;
  };
}
