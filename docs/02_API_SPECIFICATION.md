# API Specification: 성락교회 웹페이지

## 1. 기본 정보

| 항목 | 값 |
|------|-----|
| **Base URL** | `/api/v1` |
| **인증 방식** | JWT Bearer Token |
| **Content-Type** | `application/json` |

## 2. 공통 Response 형식

### 성공 응답
```json
{
  "success": true,
  "data": T,
  "message": "optional message"
}
```

### 페이지네이션 응답
```json
{
  "success": true,
  "data": {
    "content": T[],
    "page": 0,
    "size": 10,
    "totalElements": 100,
    "totalPages": 10
  }
}
```

### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": {}
  }
}
```

## 3. 에러 코드 정의

| 코드 | HTTP Status | 설명 |
|------|-------------|------|
| `UNAUTHORIZED` | 401 | 인증 필요 |
| `FORBIDDEN` | 403 | 권한 없음 |
| `NOT_FOUND` | 404 | 리소스 없음 |
| `VALIDATION_ERROR` | 400 | 입력값 오류 |
| `INTERNAL_ERROR` | 500 | 서버 오류 |

## 4. 인증 헤더

```
Authorization: Bearer <access_token>
```

---

## 5. 공개 API (인증 불필요)

### 5.1 설교 영상

#### GET /api/v1/sermons
설교 영상 목록 조회

**Query Parameters:**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|-----|------|
| `page` | number | N | 페이지 번호 (기본: 0) |
| `size` | number | N | 페이지 크기 (기본: 10) |
| `playlist` | string | N | 재생목록 필터 (sunday/wednesday/dawn) |
| `search` | string | N | 검색어 (제목) |

**Response:**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "sermon_001",
        "title": "믿음의 여정",
        "description": "2024년 1월 첫째주 설교",
        "youtubeId": "abc123xyz",
        "thumbnailUrl": "https://img.youtube.com/...",
        "playlist": "sunday",
        "preacher": "담임목사",
        "publishedAt": "2024-01-07T10:00:00Z",
        "duration": "PT45M30S",
        "viewCount": 1234
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 150,
    "totalPages": 15
  }
}
```

#### GET /api/v1/sermons/latest
최신 설교 조회 (메인페이지용)

**Response:**
```json
{
  "success": true,
  "data": {
    "featured": { /* 메인 설교 1개 */ },
    "recent": [ /* 최근 설교 3개 */ ]
  }
}
```

#### GET /api/v1/sermons/:id
설교 영상 상세 조회

---

### 5.2 공지사항/소식

#### GET /api/v1/notices
공지사항 목록 조회

**Query Parameters:**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|-----|------|
| `page` | number | N | 페이지 번호 |
| `size` | number | N | 페이지 크기 |
| `category` | string | N | 카테고리 (news/event/weekly) |

**Response:**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "notice_001",
        "title": "2024년 신년 감사예배 안내",
        "content": "...",
        "category": "event",
        "thumbnailUrl": "https://...",
        "isPinned": true,
        "viewCount": 500,
        "createdAt": "2024-01-01T09:00:00Z"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 50,
    "totalPages": 5
  }
}
```

#### GET /api/v1/notices/:id
공지사항 상세 조회

---

### 5.3 예배 정보

#### GET /api/v1/worships
예배 정보 목록 조회

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "worship_001",
      "name": "주일 1부 예배",
      "day": "sunday",
      "time": "07:00",
      "location": "대예배실",
      "description": "찬양과 말씀의 예배",
      "order": 1
    },
    {
      "id": "worship_002",
      "name": "주일 2부 예배",
      "day": "sunday",
      "time": "09:30",
      "location": "대예배실",
      "description": "찬양과 말씀의 예배",
      "order": 2
    }
  ]
}
```

---

### 5.4 교회 소개

#### GET /api/v1/church-info
교회 소개 정보 조회

**Response:**
```json
{
  "success": true,
  "data": {
    "greeting": {
      "title": "담임목사 인사말",
      "content": "...",
      "pastorName": "홍길동",
      "pastorImage": "https://..."
    },
    "vision": {
      "title": "교회 비전",
      "content": "...",
      "values": ["신실한 헌신", "긍휼한 아낌"]
    },
    "history": [
      { "year": "1999", "content": "교회 설립" },
      { "year": "2005", "content": "세계센터 건축" }
    ],
    "organization": {
      "content": "...",
      "chartImage": "https://..."
    },
    "location": {
      "address": "서울시 구로구 신도림로 56-24",
      "phone": "070-7300-6200",
      "fax": "02-844-8711",
      "coordinates": { "lat": 37.123, "lng": 126.456 }
    }
  }
}
```

---

### 5.5 라이브 스트림

#### GET /api/v1/livestream
현재 라이브 스트림 정보

**Response:**
```json
{
  "success": true,
  "data": {
    "isLive": true,
    "title": "주일 2부 예배 실황",
    "youtubeId": "live_abc123",
    "startedAt": "2024-01-07T09:30:00Z"
  }
}
```

---

### 5.6 새가족 문의

#### POST /api/v1/newcomer-inquiries
새가족 문의 제출

**Request Body:**
```json
{
  "name": "김철수",
  "phone": "010-1234-5678",
  "email": "kim@example.com",
  "message": "교회에 방문하고 싶습니다.",
  "preferredContact": "phone"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "inquiry_001",
    "message": "문의가 접수되었습니다. 곧 연락드리겠습니다."
  }
}
```

---

## 6. 관리자 API (인증 필요)

### 6.1 인증

#### POST /api/v1/auth/login
관리자 로그인

**Request Body:**
```json
{
  "email": "admin@sungrak.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbG...",
    "refreshToken": "eyJhbG...",
    "expiresIn": 3600,
    "user": {
      "id": "admin_001",
      "email": "admin@sungrak.com",
      "name": "관리자",
      "role": "SUPER_ADMIN"
    }
  }
}
```

#### POST /api/v1/auth/logout
로그아웃

#### POST /api/v1/auth/refresh
토큰 갱신

#### GET /api/v1/auth/me
현재 사용자 정보

---

### 6.2 공지사항 관리

#### GET /api/v1/admin/notices
관리자용 공지사항 목록

#### POST /api/v1/admin/notices
공지사항 생성

**Request Body:**
```json
{
  "title": "제목",
  "content": "내용",
  "category": "news",
  "isPinned": false,
  "thumbnailUrl": "https://..."
}
```

#### PUT /api/v1/admin/notices/:id
공지사항 수정

#### DELETE /api/v1/admin/notices/:id
공지사항 삭제

---

### 6.3 예배정보 관리

#### PUT /api/v1/admin/worships/:id
예배정보 수정

#### POST /api/v1/admin/worships
예배정보 추가

#### DELETE /api/v1/admin/worships/:id
예배정보 삭제

---

### 6.4 교회소개 관리

#### PUT /api/v1/admin/church-info/:section
섹션별 수정 (greeting/vision/history/organization/location)

---

### 6.5 라이브 설정

#### PUT /api/v1/admin/livestream
라이브 설정 수정

**Request Body:**
```json
{
  "isLive": true,
  "title": "주일 예배 실황",
  "youtubeId": "live_abc123"
}
```

---

### 6.6 새가족 문의 관리

#### GET /api/v1/admin/newcomer-inquiries
문의 목록 조회

**Query Parameters:**
| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `status` | string | 상태 필터 (pending/contacted/completed) |

#### PUT /api/v1/admin/newcomer-inquiries/:id
문의 상태 업데이트

**Request Body:**
```json
{
  "status": "contacted",
  "note": "1/8 전화 연락 완료"
}
```

---

### 6.7 설교 동기화

#### POST /api/v1/admin/sermons/sync
유튜브 재생목록 수동 동기화

**Request Body:**
```json
{
  "playlist": "sunday"
}
```

---

### 6.8 관리자 계정 (SUPER_ADMIN만)

#### GET /api/v1/admin/users
관리자 목록

#### POST /api/v1/admin/users
관리자 생성

**Request Body:**
```json
{
  "email": "staff@sungrak.com",
  "password": "temp1234",
  "name": "담당자",
  "role": "ADMIN"
}
```

#### PUT /api/v1/admin/users/:id
관리자 정보 수정

#### DELETE /api/v1/admin/users/:id
관리자 삭제
