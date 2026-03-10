# LocalStorage Schema: 성락교회 웹페이지

> Mock 환경에서 사용할 LocalStorage 스키마
> PostgreSQL 테이블과 1:1 매핑

## 1. 키 구조 개요

```typescript
const STORAGE_KEYS = {
  // 인증
  AUTH: 'sungrak_auth',

  // 엔티티 데이터
  ADMINS: 'sungrak_admins',
  SERMONS: 'sungrak_sermons',
  NOTICES: 'sungrak_notices',
  WORSHIPS: 'sungrak_worships',
  CHURCH_INFO: 'sungrak_church_info',
  LIVESTREAM: 'sungrak_livestream',
  NEWCOMER_INQUIRIES: 'sungrak_newcomer_inquiries',
} as const;
```

## 2. 상세 스키마

### 2.1 인증 (sungrak_auth)

```typescript
interface AuthStorage {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'SUPER_ADMIN' | 'ADMIN';
  };
  expiresAt: number; // timestamp
}

// LocalStorage
localStorage.setItem('sungrak_auth', JSON.stringify({
  accessToken: "mock_access_token_xxx",
  refreshToken: "mock_refresh_token_xxx",
  user: {
    id: "admin_001",
    email: "admin@sungrak.com",
    name: "최고관리자",
    role: "SUPER_ADMIN"
  },
  expiresAt: 1704672000000
}));
```

### 2.2 관리자 (sungrak_admins)

```typescript
interface AdminStorage {
  id: string;
  email: string;
  password: string; // 해시 없이 plain (Mock용)
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

// PostgreSQL 매핑
/*
CREATE TABLE admins (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'ADMIN',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

// 초기 데이터
const initialAdmins: AdminStorage[] = [
  {
    id: "admin_001",
    email: "admin@sungrak.com",
    password: "admin1234",
    name: "최고관리자",
    role: "SUPER_ADMIN",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];
```

### 2.3 설교 (sungrak_sermons)

```typescript
interface SermonStorage {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnailUrl: string;
  playlist: 'sunday' | 'wednesday' | 'dawn';
  preacher: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// PostgreSQL 매핑
/*
CREATE TABLE sermons (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  youtube_id VARCHAR(50) NOT NULL,
  thumbnail_url VARCHAR(500),
  playlist VARCHAR(20) NOT NULL,
  preacher VARCHAR(100),
  published_at TIMESTAMP,
  duration VARCHAR(20),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sermons_playlist ON sermons(playlist);
CREATE INDEX idx_sermons_published_at ON sermons(published_at DESC);
*/

// 초기 데이터 예시
const initialSermons: SermonStorage[] = [
  {
    id: "sermon_001",
    title: "2024년 신년 축복 설교",
    description: "새해를 맞이하며 하나님의 축복을 선포합니다.",
    youtubeId: "abc123xyz",
    thumbnailUrl: "https://img.youtube.com/vi/abc123xyz/maxresdefault.jpg",
    playlist: "sunday",
    preacher: "담임목사",
    publishedAt: "2024-01-07T10:00:00Z",
    duration: "PT45M30S",
    viewCount: 1234,
    createdAt: "2024-01-07T12:00:00Z",
    updatedAt: "2024-01-07T12:00:00Z"
  }
];
```

### 2.4 공지사항 (sungrak_notices)

```typescript
interface NoticeStorage {
  id: string;
  title: string;
  content: string;
  category: 'news' | 'event' | 'weekly';
  thumbnailUrl?: string;
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// PostgreSQL 매핑
/*
CREATE TABLE notices (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(20) NOT NULL,
  thumbnail_url VARCHAR(500),
  is_pinned BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notices_category ON notices(category);
CREATE INDEX idx_notices_pinned ON notices(is_pinned DESC, created_at DESC);
*/

// 초기 데이터 예시
const initialNotices: NoticeStorage[] = [
  {
    id: "notice_001",
    title: "2024년 신년 감사예배 안내",
    content: "<p>2024년 1월 1일 오전 10시, 신년 감사예배가 있습니다.</p>",
    category: "event",
    thumbnailUrl: "https://example.com/image.jpg",
    isPinned: true,
    viewCount: 500,
    createdAt: "2024-01-01T09:00:00Z",
    updatedAt: "2024-01-01T09:00:00Z"
  }
];
```

### 2.5 예배정보 (sungrak_worships)

```typescript
interface WorshipStorage {
  id: string;
  name: string;
  day: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  time: string;
  location: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// PostgreSQL 매핑
/*
CREATE TABLE worships (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  day VARCHAR(10) NOT NULL,
  time VARCHAR(10) NOT NULL,
  location VARCHAR(200) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

// 초기 데이터
const initialWorships: WorshipStorage[] = [
  {
    id: "worship_001",
    name: "주일 1부 예배",
    day: "sunday",
    time: "07:00",
    location: "대예배실",
    description: "찬양과 말씀의 예배",
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "worship_002",
    name: "주일 2부 예배",
    day: "sunday",
    time: "09:30",
    location: "대예배실",
    description: "찬양과 말씀의 예배",
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "worship_003",
    name: "주일 3부 예배",
    day: "sunday",
    time: "11:30",
    location: "대예배실",
    description: "찬양과 말씀의 예배",
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "worship_004",
    name: "수요예배",
    day: "wednesday",
    time: "19:30",
    location: "대예배실",
    order: 4,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "worship_005",
    name: "새벽기도회",
    day: "monday",
    time: "05:00",
    location: "새벽기도실",
    description: "월~토 매일",
    order: 5,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];
```

### 2.6 교회소개 (sungrak_church_info)

```typescript
interface ChurchInfoStorage {
  greeting: {
    title: string;
    content: string;
    pastorName: string;
    pastorImage?: string;
  };
  vision: {
    title: string;
    content: string;
    values: string[];
  };
  history: Array<{
    year: string;
    content: string;
  }>;
  organization: {
    content: string;
    chartImage?: string;
  };
  location: {
    address: string;
    phone: string;
    fax?: string;
    email?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

// PostgreSQL 매핑 (JSON 컬럼 또는 별도 테이블)
/*
CREATE TABLE church_info (
  id VARCHAR(36) PRIMARY KEY DEFAULT 'main',
  greeting JSONB NOT NULL,
  vision JSONB NOT NULL,
  history JSONB NOT NULL,
  organization JSONB NOT NULL,
  location JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

// 초기 데이터
const initialChurchInfo: ChurchInfoStorage = {
  greeting: {
    title: "담임목사 인사말",
    content: "성락교회에 오신 것을 환영합니다. 우리 교회는 신실한 헌신과 긍휼한 아낌으로 하나님과 이웃을 섬기는 공동체입니다.",
    pastorName: "김기동 목사",
    pastorImage: "/images/pastor.jpg"
  },
  vision: {
    title: "교회 비전",
    content: "Faith, a Relationship with the Lord - 주님과의 관계 안에서 믿음으로 살아가는 교회",
    values: ["신실한 헌신 (Sincere Devotion)", "긍휼한 아낌 (Compassionate Fellowship)"]
  },
  history: [
    { year: "1999", content: "성락교회 설립" },
    { year: "2005", content: "세계센터 건축" },
    { year: "2010", content: "신길본당 개원" }
  ],
  organization: {
    content: "성락교회는 담임목사를 중심으로 장로회, 각 부서가 유기적으로 협력하고 있습니다.",
    chartImage: "/images/org-chart.png"
  },
  location: {
    address: "서울시 구로구 신도림로 56-24",
    phone: "070-7300-6200",
    fax: "02-844-8711",
    coordinates: { lat: 37.5085, lng: 126.8915 }
  }
};
```

### 2.7 라이브 스트림 (sungrak_livestream)

```typescript
interface LiveStreamStorage {
  isLive: boolean;
  title?: string;
  youtubeId?: string;
  startedAt?: string;
}

// PostgreSQL 매핑
/*
CREATE TABLE livestream (
  id VARCHAR(36) PRIMARY KEY DEFAULT 'current',
  is_live BOOLEAN DEFAULT FALSE,
  title VARCHAR(200),
  youtube_id VARCHAR(50),
  started_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

// 초기 데이터
const initialLiveStream: LiveStreamStorage = {
  isLive: false,
  title: "",
  youtubeId: "",
  startedAt: ""
};
```

### 2.8 새가족 문의 (sungrak_newcomer_inquiries)

```typescript
interface NewcomerInquiryStorage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  preferredContact: 'phone' | 'email' | 'kakao';
  status: 'pending' | 'contacted' | 'completed';
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// PostgreSQL 매핑
/*
CREATE TABLE newcomer_inquiries (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  message TEXT NOT NULL,
  preferred_contact VARCHAR(20) DEFAULT 'phone',
  status VARCHAR(20) DEFAULT 'pending',
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_newcomer_inquiries_status ON newcomer_inquiries(status);
*/

// 초기 데이터
const initialNewcomerInquiries: NewcomerInquiryStorage[] = [];
```

## 3. 초기화 함수

```typescript
// lib/storage/init.ts

import { STORAGE_KEYS } from './keys';

export function initializeStorage() {
  // 이미 초기화되었는지 확인
  const isInitialized = localStorage.getItem('sungrak_initialized');
  if (isInitialized) return;

  // 각 키별 초기 데이터 설정
  localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(initialAdmins));
  localStorage.setItem(STORAGE_KEYS.SERMONS, JSON.stringify(initialSermons));
  localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(initialNotices));
  localStorage.setItem(STORAGE_KEYS.WORSHIPS, JSON.stringify(initialWorships));
  localStorage.setItem(STORAGE_KEYS.CHURCH_INFO, JSON.stringify(initialChurchInfo));
  localStorage.setItem(STORAGE_KEYS.LIVESTREAM, JSON.stringify(initialLiveStream));
  localStorage.setItem(STORAGE_KEYS.NEWCOMER_INQUIRIES, JSON.stringify(initialNewcomerInquiries));

  // 초기화 완료 표시
  localStorage.setItem('sungrak_initialized', 'true');
}

export function resetStorage() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  localStorage.removeItem('sungrak_initialized');
  initializeStorage();
}
```

## 4. 헬퍼 함수

```typescript
// lib/storage/helpers.ts

export function getStorageItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}
```

## 5. PostgreSQL 전체 스키마

```sql
-- BE 연동 시 사용할 전체 PostgreSQL 스키마

-- 관리자
CREATE TABLE admins (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'ADMIN',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 설교
CREATE TABLE sermons (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  youtube_id VARCHAR(50) NOT NULL,
  thumbnail_url VARCHAR(500),
  playlist VARCHAR(20) NOT NULL,
  preacher VARCHAR(100),
  published_at TIMESTAMP,
  duration VARCHAR(20),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 공지사항
CREATE TABLE notices (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(20) NOT NULL,
  thumbnail_url VARCHAR(500),
  is_pinned BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 예배정보
CREATE TABLE worships (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  day VARCHAR(10) NOT NULL,
  time VARCHAR(10) NOT NULL,
  location VARCHAR(200) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 교회소개
CREATE TABLE church_info (
  id VARCHAR(36) PRIMARY KEY DEFAULT 'main',
  greeting JSONB NOT NULL,
  vision JSONB NOT NULL,
  history JSONB NOT NULL,
  organization JSONB NOT NULL,
  location JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 라이브 스트림
CREATE TABLE livestream (
  id VARCHAR(36) PRIMARY KEY DEFAULT 'current',
  is_live BOOLEAN DEFAULT FALSE,
  title VARCHAR(200),
  youtube_id VARCHAR(50),
  started_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 새가족 문의
CREATE TABLE newcomer_inquiries (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  message TEXT NOT NULL,
  preferred_contact VARCHAR(20) DEFAULT 'phone',
  status VARCHAR(20) DEFAULT 'pending',
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_sermons_playlist ON sermons(playlist);
CREATE INDEX idx_sermons_published_at ON sermons(published_at DESC);
CREATE INDEX idx_notices_category ON notices(category);
CREATE INDEX idx_notices_pinned ON notices(is_pinned DESC, created_at DESC);
CREATE INDEX idx_newcomer_inquiries_status ON newcomer_inquiries(status);
```
