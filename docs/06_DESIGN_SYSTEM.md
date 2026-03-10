# Design System & UI Setup: 성락교회 웹페이지

## 1. 디자인 컨셉

### 1.1 톤앤매너
| 항목 | 방향 |
|------|------|
| **전체 느낌** | 밝고 따뜻함 + 고급스러움 |
| **키워드** | 신뢰, 환영, 평화, 세련됨 |
| **분위기** | 현대적인 교회, 누구나 오고 싶은 공간 |

### 1.2 컬러 팔레트

```css
:root {
  /* Primary - 따뜻한 골드/베이지 계열 */
  --color-primary-50: #FFFBEB;
  --color-primary-100: #FEF3C7;
  --color-primary-200: #FDE68A;
  --color-primary-300: #FCD34D;
  --color-primary-400: #FBBF24;
  --color-primary-500: #F59E0B;  /* 메인 포인트 */
  --color-primary-600: #D97706;
  --color-primary-700: #B45309;
  --color-primary-800: #92400E;
  --color-primary-900: #78350F;

  /* Neutral - 따뜻한 그레이 */
  --color-neutral-50: #FAFAF9;
  --color-neutral-100: #F5F5F4;
  --color-neutral-200: #E7E5E4;
  --color-neutral-300: #D6D3D1;
  --color-neutral-400: #A8A29E;
  --color-neutral-500: #78716C;
  --color-neutral-600: #57534E;
  --color-neutral-700: #44403C;
  --color-neutral-800: #292524;
  --color-neutral-900: #1C1917;

  /* Accent - 포인트 컬러 */
  --color-accent-blue: #3B82F6;
  --color-accent-green: #10B981;
  --color-accent-red: #EF4444;

  /* Background */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #FAFAF9;
  --color-bg-tertiary: #F5F5F4;

  /* Text */
  --color-text-primary: #1C1917;
  --color-text-secondary: #57534E;
  --color-text-tertiary: #A8A29E;
}
```

### 1.3 타이포그래피

```css
:root {
  /* Font Family */
  --font-display: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Font Size Scale */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 3.75rem;    /* 60px */

  /* Line Height */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Font Weight */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### 1.4 간격 시스템

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

## 2. 기술 스택 & 설치

### 2.1 프로젝트 생성

```bash
# Next.js + TypeScript
npx create-next-app@latest sungrak-web --typescript --tailwind --eslint --app --src-dir

cd sungrak-web
```

### 2.2 핵심 패키지 설치

```bash
# UI 컴포넌트
npx shadcn@latest init

# 애니메이션
npm install framer-motion

# 서버 상태 관리
npm install @tanstack/react-query

# 클라이언트 상태 관리
npm install zustand

# 폼 관리
npm install react-hook-form zod @hookform/resolvers

# 아이콘
npm install lucide-react

# 유틸리티
npm install clsx tailwind-merge date-fns

# Mock 환경
npm install -D msw @faker-js/faker
```

### 2.3 shadcn/ui 컴포넌트 설치

```bash
# 필수 컴포넌트
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add navigation-menu
npx shadcn@latest add tabs
npx shadcn@latest add toast
npx shadcn@latest add skeleton
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add separator
npx shadcn@latest add sheet
npx shadcn@latest add form
npx shadcn@latest add table
npx shadcn@latest add pagination
```

### 2.4 Tailwind 설정

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        neutral: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## 3. 애니메이션 가이드

### 3.1 Framer Motion 기본 패턴

```typescript
// lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

export const parallaxScroll = (offset: number = 50) => ({
  initial: { y: offset },
  whileInView: { y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
});
```

### 3.2 스크롤 애니메이션 컴포넌트

```typescript
// components/ui/motion-wrapper.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeInUp({ children, delay = 0, className }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

## 4. 컴포넌트 목록

### 4.1 공통 컴포넌트

| 컴포넌트 | 용도 | shadcn |
|---------|------|--------|
| `Header` | 네비게이션 헤더 | navigation-menu |
| `Footer` | 푸터 | - |
| `MobileNav` | 모바일 메뉴 | sheet |
| `Section` | 섹션 컨테이너 | - |
| `Container` | 콘텐츠 컨테이너 | - |
| `PageTitle` | 페이지 제목 | - |
| `Breadcrumb` | 브레드크럼 | - |
| `LoadingSpinner` | 로딩 인디케이터 | - |
| `ErrorBoundary` | 에러 핸들링 | - |

### 4.2 메인 페이지 컴포넌트

| 컴포넌트 | 설명 |
|---------|------|
| `HeroSection` | 히어로 배너 (패럴랙스) |
| `LiveBadge` | 라이브 상태 배지 |
| `SermonSection` | 최신 설교 섹션 |
| `SermonCard` | 설교 카드 |
| `AboutPreview` | 교회 소개 미리보기 |
| `NewsSection` | 소식 섹션 |
| `NewsCard` | 소식 카드 |
| `NewcomerCTA` | 새가족 환영 CTA |
| `QuickLinks` | 빠른 링크 |

### 4.3 설교 페이지 컴포넌트

| 컴포넌트 | 설명 |
|---------|------|
| `SermonList` | 설교 목록 |
| `SermonFilter` | 재생목록 필터 탭 |
| `SermonPlayer` | 유튜브 플레이어 |
| `SermonInfo` | 설교 정보 |

### 4.4 폼 컴포넌트

| 컴포넌트 | 설명 |
|---------|------|
| `NewcomerForm` | 새가족 문의 폼 |
| `ContactForm` | 일반 문의 폼 |
| `SearchForm` | 검색 폼 |

### 4.5 관리자 컴포넌트

| 컴포넌트 | 설명 |
|---------|------|
| `AdminLayout` | 관리자 레이아웃 |
| `AdminSidebar` | 사이드바 네비게이션 |
| `DataTable` | 데이터 테이블 |
| `RichTextEditor` | 리치 텍스트 에디터 |
| `ImageUploader` | 이미지 업로더 |
| `StatCard` | 통계 카드 |

## 5. 폴더 구조

```
src/
├── app/                      # Next.js App Router
│   ├── (public)/            # 공개 페이지 그룹
│   │   ├── page.tsx         # 메인
│   │   ├── about/           # 교회소개
│   │   ├── worship/         # 예배안내
│   │   ├── sermons/         # 설교/영상
│   │   ├── newcomer/        # 새가족
│   │   ├── news/            # 소식
│   │   └── contact/         # 문의
│   ├── admin/               # 관리자 페이지
│   │   ├── layout.tsx
│   │   ├── page.tsx         # 대시보드
│   │   ├── login/
│   │   ├── notices/
│   │   ├── worships/
│   │   ├── church-info/
│   │   ├── livestream/
│   │   ├── inquiries/
│   │   ├── sermons/
│   │   └── users/
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                  # shadcn 컴포넌트
│   ├── common/              # 공통 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Section.tsx
│   │   └── ...
│   ├── home/                # 메인 페이지
│   ├── sermons/             # 설교 관련
│   ├── forms/               # 폼 관련
│   └── admin/               # 관리자 전용
│
├── lib/
│   ├── api/                 # API 서비스 레이어
│   │   ├── client.ts        # Axios 인스턴스
│   │   ├── sermons.ts
│   │   ├── notices.ts
│   │   └── ...
│   ├── storage/             # LocalStorage 관련
│   ├── animations.ts        # 애니메이션 프리셋
│   └── utils.ts             # 유틸리티
│
├── hooks/                   # 커스텀 훅
│   ├── useAuth.ts
│   ├── useSermons.ts
│   └── ...
│
├── stores/                  # Zustand 스토어
│   ├── authStore.ts
│   └── uiStore.ts
│
├── types/                   # TypeScript 타입
│   ├── api.ts
│   ├── entities.ts
│   ├── requests.ts
│   └── responses.ts
│
└── mocks/                   # MSW Mock
    ├── browser.ts
    ├── handlers/
    │   ├── auth.ts
    │   ├── sermons.ts
    │   └── ...
    └── data/
        └── initial.ts
```

## 6. 반응형 브레이크포인트

```css
/* Tailwind 기본 브레이크포인트 */
sm: 640px   /* 모바일 가로 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 작은 데스크톱 */
xl: 1280px  /* 데스크톱 */
2xl: 1536px /* 대형 데스크톱 */
```

## 7. 메인 페이지 시안 가이드

메인 페이지 개발 시 **3가지 시안**을 준비:

### 시안 A: 영상 중심
- 히어로에 대형 유튜브 라이브/최신 설교
- 풀스크린 비디오 배경
- 미니멀한 텍스트

### 시안 B: 이미지 중심
- 아름다운 교회 사진 슬라이더
- 비전 문구 오버레이
- 설교는 섹션으로 분리

### 시안 C: 밸런스형
- 반반 레이아웃 (좌: 텍스트/우: 영상)
- 스크롤 시 섹션별 전환
- 인터랙티브 요소 강조

각 시안은 동일한 컴포넌트를 사용하되, 레이아웃과 애니메이션만 다르게 구성.
