# TypeScript Types: 성락교회 웹페이지

> 복사해서 바로 사용 가능한 타입 정의

## 1. 공통 타입

```typescript
// types/api.ts

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

export interface PaginatedResponse<T> {
  success: true;
  data: PaginatedData<T>;
}
```

## 2. Entity 타입 (DB 테이블 매핑)

```typescript
// types/entities.ts

// ===== Admin (관리자) =====

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN';

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
}

// ===== Sermon (설교) =====

export type PlaylistType = 'sunday' | 'wednesday' | 'dawn';

export interface Sermon {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnailUrl: string;
  playlist: PlaylistType;
  preacher: string;
  publishedAt: string;
  duration: string; // ISO 8601 duration (PT45M30S)
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// ===== Notice (공지사항) =====

export type NoticeCategory = 'news' | 'event' | 'weekly';

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

export type DayType = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface Worship {
  id: string;
  name: string;
  day: DayType;
  time: string; // HH:mm format
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

export type InquiryStatus = 'pending' | 'contacted' | 'completed';
export type PreferredContact = 'phone' | 'email' | 'kakao';

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
```

## 3. Request DTO

```typescript
// types/requests.ts

// ===== Auth =====

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// ===== Notice =====

export interface CreateNoticeRequest {
  title: string;
  content: string;
  category: NoticeCategory;
  isPinned?: boolean;
  thumbnailUrl?: string;
}

export interface UpdateNoticeRequest {
  title?: string;
  content?: string;
  category?: NoticeCategory;
  isPinned?: boolean;
  thumbnailUrl?: string;
}

// ===== Worship =====

export interface CreateWorshipRequest {
  name: string;
  day: DayType;
  time: string;
  location: string;
  description?: string;
  order?: number;
}

export interface UpdateWorshipRequest {
  name?: string;
  day?: DayType;
  time?: string;
  location?: string;
  description?: string;
  order?: number;
}

// ===== ChurchInfo =====

export interface UpdateChurchGreetingRequest {
  title?: string;
  content?: string;
  pastorName?: string;
  pastorImage?: string;
}

export interface UpdateChurchVisionRequest {
  title?: string;
  content?: string;
  values?: string[];
}

export interface UpdateChurchHistoryRequest {
  history: ChurchHistoryItem[];
}

export interface UpdateChurchOrganizationRequest {
  content?: string;
  chartImage?: string;
}

export interface UpdateChurchLocationRequest {
  address?: string;
  phone?: string;
  fax?: string;
  email?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// ===== LiveStream =====

export interface UpdateLiveStreamRequest {
  isLive: boolean;
  title?: string;
  youtubeId?: string;
}

// ===== NewcomerInquiry =====

export interface CreateNewcomerInquiryRequest {
  name: string;
  phone: string;
  email?: string;
  message: string;
  preferredContact?: PreferredContact;
}

export interface UpdateNewcomerInquiryRequest {
  status: InquiryStatus;
  note?: string;
}

// ===== Admin =====

export interface CreateAdminRequest {
  email: string;
  password: string;
  name: string;
  role: AdminRole;
}

export interface UpdateAdminRequest {
  name?: string;
  role?: AdminRole;
  password?: string;
}

// ===== Sermon Sync =====

export interface SyncSermonsRequest {
  playlist?: PlaylistType;
}
```

## 4. Response DTO

```typescript
// types/responses.ts

// ===== Auth =====

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AdminResponse;
}

export interface AdminResponse {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

// ===== Sermon =====

export interface SermonResponse {
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
}

export interface SermonLatestResponse {
  featured: SermonResponse;
  recent: SermonResponse[];
}

// ===== Notice =====

export interface NoticeResponse {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  thumbnailUrl?: string;
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
}

export interface NoticeListResponse {
  id: string;
  title: string;
  category: NoticeCategory;
  thumbnailUrl?: string;
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
}

// ===== Worship =====

export interface WorshipResponse {
  id: string;
  name: string;
  day: DayType;
  time: string;
  location: string;
  description?: string;
  order: number;
}

// ===== LiveStream =====

export interface LiveStreamResponse {
  isLive: boolean;
  title?: string;
  youtubeId?: string;
  startedAt?: string;
}

// ===== NewcomerInquiry =====

export interface NewcomerInquiryResponse {
  id: string;
  message: string;
}

export interface NewcomerInquiryAdminResponse {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  preferredContact: PreferredContact;
  status: InquiryStatus;
  note?: string;
  createdAt: string;
}
```

## 5. Query Parameter 타입

```typescript
// types/queries.ts

export interface SermonQueryParams extends PaginationParams {
  playlist?: PlaylistType;
  search?: string;
}

export interface NoticeQueryParams extends PaginationParams {
  category?: NoticeCategory;
}

export interface NewcomerInquiryQueryParams extends PaginationParams {
  status?: InquiryStatus;
}
```

## 6. 유틸리티 타입

```typescript
// types/utils.ts

// ID가 필수인 타입
export type WithId<T> = T & { id: string };

// 생성/수정 시간이 필수인 타입
export type WithTimestamps<T> = T & {
  createdAt: string;
  updatedAt: string;
};

// Partial but required id
export type UpdatePayload<T> = Partial<Omit<T, 'id'>> & { id: string };
```
