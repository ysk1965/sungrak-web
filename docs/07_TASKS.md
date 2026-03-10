# TASKS: 성락교회 웹페이지

## Milestone 0: 프로젝트 세팅

### 0.1 프로젝트 초기화
- [ ] Next.js + TypeScript 프로젝트 생성
- [ ] Tailwind CSS 설정
- [ ] ESLint + Prettier 설정
- [ ] 폴더 구조 생성

### 0.2 UI 라이브러리 세팅
- [ ] shadcn/ui 초기화
- [ ] 필수 컴포넌트 설치 (button, card, input 등)
- [ ] Pretendard 폰트 설정
- [ ] 커스텀 컬러 팔레트 적용

### 0.3 상태 관리 세팅
- [ ] TanStack Query 설정
- [ ] Zustand 스토어 구조 생성
- [ ] Framer Motion 설정

### 0.4 Mock 환경 세팅
- [ ] MSW 설치 및 브라우저 설정
- [ ] LocalStorage 스키마 정의
- [ ] 초기 데이터 생성 (Faker.js)
- [ ] API 환경변수 설정 (NEXT_PUBLIC_API_MODE)

### 0.5 API Service Layer
- [ ] Axios 인스턴스 생성
- [ ] 공통 Response 타입 정의
- [ ] 에러 핸들링 인터셉터
- [ ] 인증 토큰 자동 첨부

---

## Milestone 1: Mock API 구현

### 1.1 인증 API
- [ ] POST /auth/login 핸들러
- [ ] POST /auth/logout 핸들러
- [ ] POST /auth/refresh 핸들러
- [ ] GET /auth/me 핸들러

### 1.2 설교 API
- [ ] GET /sermons 핸들러 (페이지네이션, 필터)
- [ ] GET /sermons/latest 핸들러
- [ ] GET /sermons/:id 핸들러
- [ ] POST /admin/sermons/sync 핸들러

### 1.3 공지사항 API
- [ ] GET /notices 핸들러
- [ ] GET /notices/:id 핸들러
- [ ] POST /admin/notices 핸들러
- [ ] PUT /admin/notices/:id 핸들러
- [ ] DELETE /admin/notices/:id 핸들러

### 1.4 기타 API
- [ ] GET /worships 핸들러
- [ ] GET /church-info 핸들러
- [ ] GET /livestream 핸들러
- [ ] POST /newcomer-inquiries 핸들러
- [ ] 관리자 CRUD 핸들러들

---

## Milestone 2: 공통 컴포넌트 개발

### 2.1 레이아웃
- [ ] Header 컴포넌트 (데스크톱 네비게이션)
- [ ] MobileNav 컴포넌트 (모바일 햄버거 메뉴)
- [ ] Footer 컴포넌트
- [ ] Section 컨테이너 컴포넌트
- [ ] Container 컴포넌트

### 2.2 애니메이션 래퍼
- [ ] FadeInUp 컴포넌트
- [ ] ScaleIn 컴포넌트
- [ ] ParallaxSection 컴포넌트
- [ ] StaggerContainer 컴포넌트

### 2.3 UI 컴포넌트
- [ ] PageTitle 컴포넌트
- [ ] Breadcrumb 컴포넌트
- [ ] LoadingSpinner 컴포넌트
- [ ] EmptyState 컴포넌트
- [ ] ErrorMessage 컴포넌트

---

## Milestone 3: 메인 페이지 (시안 3개)

### 3.1 공통 섹션 컴포넌트
- [ ] LiveBadge 컴포넌트
- [ ] SermonCard 컴포넌트
- [ ] NewsCard 컴포넌트
- [ ] NewcomerCTA 컴포넌트

### 3.2 시안 A (영상 중심)
- [ ] HeroSection - 풀스크린 비디오
- [ ] 전체 레이아웃 구성
- [ ] 애니메이션 적용

### 3.3 시안 B (이미지 중심)
- [ ] HeroSection - 이미지 슬라이더
- [ ] 전체 레이아웃 구성
- [ ] 애니메이션 적용

### 3.4 시안 C (밸런스형)
- [ ] HeroSection - 반반 레이아웃
- [ ] 전체 레이아웃 구성
- [ ] 애니메이션 적용

### 3.5 메인 페이지 완성
- [ ] 시안 선택 후 최종 완성
- [ ] 반응형 테스트
- [ ] 애니메이션 최적화

---

## Milestone 4: 공개 페이지 개발

### 4.1 교회소개 페이지
- [ ] 인사말 섹션
- [ ] 비전 섹션
- [ ] 연혁 타임라인
- [ ] 조직도 섹션
- [ ] 오시는길 (지도 연동)

### 4.2 예배안내 페이지
- [ ] 예배 시간표 컴포넌트
- [ ] 예배별 상세 정보
- [ ] 반응형 레이아웃

### 4.3 설교/영상 페이지
- [ ] SermonList 컴포넌트
- [ ] SermonFilter (탭) 컴포넌트
- [ ] SermonPlayer (유튜브 임베드)
- [ ] 페이지네이션
- [ ] 검색 기능

### 4.4 새가족안내 페이지
- [ ] 안내 정보 섹션
- [ ] NewcomerForm 컴포넌트
- [ ] 폼 유효성 검증
- [ ] 제출 성공/실패 처리

### 4.5 교회소식 페이지
- [ ] 소식 목록 (카테고리 탭)
- [ ] 소식 상세 페이지
- [ ] 페이지네이션

### 4.6 문의/연락처 페이지
- [ ] 연락처 정보
- [ ] 문의 폼
- [ ] 지도 임베드

---

## Milestone 5: 관리자 페이지 개발

### 5.1 인증 & 레이아웃
- [ ] 로그인 페이지
- [ ] AdminLayout 컴포넌트
- [ ] AdminSidebar 컴포넌트
- [ ] 인증 가드 (미들웨어)

### 5.2 대시보드
- [ ] 통계 카드 (문의 수, 방문자 등)
- [ ] 최근 문의 목록
- [ ] 빠른 액션 버튼

### 5.3 공지사항 관리
- [ ] 목록 페이지 (DataTable)
- [ ] 작성/수정 폼
- [ ] 삭제 확인 다이얼로그
- [ ] 고정 토글

### 5.4 예배정보 관리
- [ ] 목록 페이지
- [ ] 추가/수정/삭제

### 5.5 교회소개 관리
- [ ] 섹션별 편집 폼
- [ ] 리치 텍스트 에디터
- [ ] 이미지 업로드

### 5.6 라이브 설정
- [ ] 라이브 ON/OFF 토글
- [ ] YouTube ID 입력
- [ ] 현재 상태 미리보기

### 5.7 새가족 문의 관리
- [ ] 문의 목록 (상태 필터)
- [ ] 상세 보기
- [ ] 상태 변경 + 메모

### 5.8 설교 동기화
- [ ] 재생목록 선택
- [ ] 동기화 버튼
- [ ] 결과 표시

### 5.9 관리자 계정 관리
- [ ] 계정 목록
- [ ] 추가/수정/삭제
- [ ] 권한 관리

---

## Milestone 6: 마무리

### 6.1 최적화
- [ ] 이미지 최적화 (Next/Image)
- [ ] 번들 사이즈 분석
- [ ] Lighthouse 점수 개선

### 6.2 SEO
- [ ] 메타 태그 설정
- [ ] OG 이미지
- [ ] sitemap.xml
- [ ] robots.txt

### 6.3 테스트
- [ ] 주요 플로우 수동 테스트
- [ ] 반응형 테스트 (모바일/태블릿/데스크톱)
- [ ] 크로스 브라우저 테스트

### 6.4 배포 준비
- [ ] 환경변수 정리
- [ ] 빌드 테스트
- [ ] Vercel/기타 배포 설정

---

## Milestone X: BE 연동 (추후)

### X.1 환경 전환
- [ ] NEXT_PUBLIC_API_MODE=real 전환
- [ ] MSW 비활성화
- [ ] 실제 API URL 설정

### X.2 Spring Boot 연동
- [ ] CORS 설정 확인
- [ ] 인증 플로우 테스트
- [ ] 각 API 엔드포인트 테스트

### X.3 데이터 마이그레이션
- [ ] LocalStorage 데이터 → PostgreSQL
- [ ] 이미지 파일 → 클라우드 스토리지

---

## 우선순위 요약

| 순서 | 마일스톤 | 예상 산출물 |
|------|---------|------------|
| 1 | M0 | 프로젝트 기본 구조 |
| 2 | M1 | Mock API 동작 |
| 3 | M2 | 공통 컴포넌트 |
| 4 | M3 | 메인 페이지 시안 3개 |
| 5 | M4 | 공개 페이지 전체 |
| 6 | M5 | 관리자 페이지 전체 |
| 7 | M6 | 최적화 & 배포 |
| 8 | MX | BE 연동 (나중에) |
