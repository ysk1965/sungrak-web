# TASK-2026-0316-001: 9개 Variant 디자인 페이지 UI/UX 가이드 전면 적용

**날짜**: 2026-03-16
**등급**: 상
**모드**: development
**도메인**: web (Next.js 15 + React 19 + TailwindCSS 3)
**상태**: 완료

---

## Summary

성락교회 웹사이트의 9개 variant 디자인 페이지(A~I)에 UI/UX 디자인 가이드를 전면 적용했습니다. 타이포그래피, 레이아웃, 접근성(WCAG 3.0 기반), 인터랙티브 요소, 모션, 시맨틱 HTML 등 가이드 전 항목을 공통 인프라 + 개별 페이지에 반영했습니다.

---

## Analysis

### Phase 1: 코드 분석 결과
- 9개 variant 페이지(variant-a~i)가 각각 독립적인 디자인 컨셉을 가짐
- 공통 컴포넌트(Header, Footer, Section, Button, MotionWrapper)가 모든 variant에서 공유됨
- variant-e, variant-i에 인라인 `<style jsx global>` 존재 → globals.css 이동 필요
- 접근성 기반(focus-visible, skip-navigation, prefers-reduced-motion)이 전무한 상태

### 영향 범위
- 수정 파일: 17개 (globals.css, layout.tsx, 공통 컴포넌트 5개, variant 9개)
- 아키텍처 변경: 없음 (기존 구조 유지, 접근성 속성 추가)

---

## Decisions

### D1: 공통 인프라 먼저, 개별 페이지 후 (Group A → Group B)
- **이유**: 공통 CSS 토큰과 컴포넌트 접근성이 모든 variant의 의존성
- **대안 검토**: 모든 파일 동시 수정 → 의존성 충돌 위험으로 기각

### D2: prefers-reduced-motion을 CSS + JS 이중 대응
- **이유**: CSS `@media` 쿼리로 전역 animation/transition 비활성화 + framer-motion `useReducedMotion()` 훅으로 JS 애니메이션 개별 제어
- **근거**: CSS만으로는 framer-motion의 JS 기반 애니메이션을 제어할 수 없음

### D3: variant-e/i 인라인 CSS를 globals.css로 이동
- **이유**: 인라인 `<style jsx global>`은 Next.js 앱 라우터와 호환성 이슈 + 전역 스타일 관리 일관성
- **결과**: `animate-gradient` 키프레임, `.scrollbar-hide` 유틸을 globals.css에 통합

### D4: Variant G에 opus 모델 할당
- **이유**: 풀페이지 스냅 스크롤 + IntersectionObserver + 도트 네비게이션의 접근성 복잡도가 높음
- **결과**: tablist/tab/tabpanel ARIA 패턴 + 키보드 네비게이션 + reduced-motion 시 snap-proximity 전환

---

## SubAgent Summary

| # | ID | 설명 | 모델 | 상태 |
|---|-----|------|------|------|
| 1 | SA-001-001 | 글로벌 CSS 디자인 토큰 + 접근성 기반 | sonnet | ✅ |
| 2 | SA-001-002 | 공통 컴포넌트 접근성 (Header/Footer/Section) | sonnet | ✅ |
| 3 | SA-001-003 | Button 44px 터치 + focus-visible | sonnet | ✅ |
| 4 | SA-001-004 | 모션 래퍼 reduced-motion | sonnet | ✅ |
| 5 | SA-001-005 | Variant A (풀스크린 시네마틱) | sonnet | ✅ |
| 6 | SA-001-006 | Variant B (이미지 슬라이더) | sonnet | ✅ |
| 7 | SA-001-007 | Variant C (스플릿 레이아웃) | sonnet | ✅ |
| 8 | SA-001-008 | Variant D (클래식 배너) | sonnet | ✅ |
| 9 | SA-001-009 | Variant E (미니멀 텍스트) + 인라인 CSS 제거 | sonnet | ✅ |
| 10 | SA-001-010 | Variant F (퀵메뉴 포탈) | sonnet | ✅ |
| 11 | SA-001-011 | Variant G (풀페이지 스냅) | opus | ✅ |
| 12 | SA-001-012 | Variant H (벤토 그리드) | sonnet | ✅ |
| 13 | SA-001-013 | Variant I (에디토리얼 매거진) + 인라인 CSS 제거 | sonnet | ✅ |

---

## Changes

### 공통 인프라 (Group A)

| 파일 | 변경 내용 |
|------|----------|
| `src/app/globals.css` | focus-visible, prefers-reduced-motion, skip-navigation, animate-gradient, scrollbar-hide, font-display: swap |
| `src/app/layout.tsx` | Skip Navigation 링크 삽입 |
| `src/components/common/header.tsx` | nav aria-label, 모바일 메뉴 aria-expanded/aria-controls, id="main-content" |
| `src/components/common/footer.tsx` | footer aria-label, `<address>` 시맨틱, `<nav>` 바로가기, tel: 링크 |
| `src/components/common/section.tsx` | aria-label/aria-labelledby prop, SectionHeader 자동 id (useId) |
| `src/components/ui/button.tsx` | min-h-[44px] min-w-[44px] 전 사이즈, focus-visible:ring-2 ring-primary |
| `src/components/common/motion-wrapper.tsx` | useReducedMotion 전 래퍼 적용, HoverCard/ParallaxSection 대응 |
| `src/lib/animations.ts` | reducedMotionVariants, reducedMotionStaggerContainer, instantTransition |

### Variant 페이지 (Group B) — 공통 적용 항목

모든 9개 variant에 일괄 적용된 항목:
- ✅ useReducedMotion() 훅 + motion.div 조건 분기
- ✅ Section 컴포넌트에 aria-label 전달
- ✅ 이미지 alt 텍스트 한국어 명확화
- ✅ 장식 요소에 aria-hidden="true"
- ✅ 아이콘에 aria-hidden="true"
- ✅ 인터랙티브 요소 min-h-[44px] 터치 영역
- ✅ 시맨틱 HTML heading 계층 정리

### Variant별 특수 적용

| Variant | 특수 적용 |
|---------|----------|
| B | 캐러셀 ARIA (role=region, aria-roledescription=carousel), 일시정지 버튼, 키보드 화살표, progressbar |
| C | 탭 ARIA (tablist/tab/tabpanel), 키보드 좌우 전환, 체크리스트 ul/li |
| D | blockquote 인사말, dl/dt/dd 예배 시간표 |
| E | 인라인 `<style jsx global>` 제거, Separator role="separator" |
| F | 퀵메뉴 nav+aria-label, group-focus-within 키보드 대응 |
| G | 도트 네비게이션 tablist/tab, snap-proximity (reduced-motion), 키보드 ArrowUp/Down, aria-current |
| H | 벤토 그리드 ul/li, 캐릭터 애니메이션 sr-only h1 |
| I | 인라인 `<style jsx global>` 제거, 카루셀 키보드 좌우, blockquote pull-quote |

---

## Test Summary

| 항목 | 결과 |
|------|------|
| TypeScript (tsc --noEmit) | ✅ 0 errors |
| Next.js Build | ✅ 13/13 pages |
| data_contracts | ✅ 13/13 이행 |
| 코드 품질 | ✅ PASS (경고 1건: ESLint 미설정) |

---

## Architecture Impact

- **변경 없음**: 기존 컴포넌트 구조, 라우팅, 상태 관리 등 아키텍처 영향 없음
- **접근성 인프라 추가**: globals.css + layout.tsx에 접근성 기반 스타일이 새로 추가됨
- **motion-wrapper 확장**: useReducedMotion 지원이 모든 래퍼에 내장됨

---

## Future Considerations

1. **ESLint 설정**: 프로젝트에 ESLint + eslint-plugin-jsx-a11y 도입 권장
2. **자동 접근성 테스트**: axe-core, pa11y 등 CI 파이프라인에 추가 검토
3. **다크모드**: 디자인 가이드에 다크모드 언급 — CSS 변수 기반 테마 시스템 확장 가능
4. **성능 모니터링**: 17개 파일 수정에 따른 번들 사이즈 변화 모니터링

---

## Tags

`accessibility` `wcag` `aria` `reduced-motion` `semantic-html` `focus-visible` `skip-navigation` `touch-target` `carousel-a11y` `tab-a11y` `design-guide`
