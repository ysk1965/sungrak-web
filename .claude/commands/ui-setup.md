React 프로젝트에 고퀄리티 UI 스택을 세팅합니다.

## 추천 스택 조합

### A. 기본 (대부분의 프로젝트)
- shadcn/ui + Tailwind CSS + Framer Motion
- 안정적이고 커스텀 자유도 높음

### B. 화려한 랜딩페이지
- Aceternity UI + Framer Motion
- 시선을 사로잡는 애니메이션

### C. 빠른 MVP
- Magic UI + shadcn/ui
- 복붙으로 빠르게 완성

## 세팅 순서

### 1단계: 기본 의존성
```bash
# Tailwind CSS (없으면)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Framer Motion
npm install framer-motion

# 아이콘
npm install lucide-react
```

### 2단계: shadcn/ui 초기화
```bash
npx shadcn@latest init
```
설정 선택:
- TypeScript: Yes
- Style: Default (또는 New York)
- Base color: 프로젝트에 맞게
- CSS variables: Yes

### 3단계: 필수 컴포넌트 설치
```bash
npx shadcn@latest add button card input label
npx shadcn@latest add dialog dropdown-menu toast
npx shadcn@latest add form select checkbox
```

### 4단계: 애니메이션 컴포넌트 (선택)

**Aceternity UI에서 복사해올 것들:**
- Hero 섹션 (Spotlight, Lamp, Aurora)
- 카드 효과 (3D Card, Hover Effect)
- 배경 효과 (Grid, Dots, Beams)

**Magic UI에서 복사해올 것들:**
- Marquee (무한 스크롤 텍스트)
- Animated List
- Dock (macOS 스타일 네비게이션)

## 세팅 시 질문

$ARGUMENTS 가 없으면 아래 질문:

1. 프로젝트 종류가 뭔가요?
   - 랜딩페이지/마케팅 사이트
   - 대시보드/어드민
   - 이커머스
   - SaaS 앱
   - 블로그/콘텐츠

2. 디자인 톤은?
   - 미니멀/깔끔
   - 화려한/임팩트 있는
   - 다크모드 중심
   - 밝고 친근한

3. 이미 설치된 게 있나요?
   - Tailwind CSS
   - 다른 UI 라이브러리

## 답변에 따른 추천

**랜딩페이지 + 화려함** → Aceternity UI + Framer Motion
**대시보드 + 미니멀** → shadcn/ui 기본
**SaaS + 다크모드** → shadcn/ui (New York) + 커스텀 테마
**빠른 MVP** → Magic UI + shadcn/ui

## 세팅 후 체크리스트
- [ ] 다크모드 토글 작동
- [ ] 반응형 브레이크포인트 확인
- [ ] 폰트 설정 (Inter, Pretendard 등)
- [ ] 컬러 팔레트 커스텀
