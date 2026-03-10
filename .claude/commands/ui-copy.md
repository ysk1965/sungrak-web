Aceternity UI, Magic UI 등에서 컴포넌트를 복사해서 프로젝트에 추가합니다.

## 사용법
`/ui-copy [컴포넌트명]`

예시:
- `/ui-copy spotlight` - Aceternity의 Spotlight 효과
- `/ui-copy marquee` - Magic UI의 Marquee
- `/ui-copy 3d-card` - 3D 카드 효과

## 주요 컴포넌트 목록

### Hero/배경 효과 (Aceternity UI)
| 이름 | 설명 | 난이도 |
|-----|------|-------|
| spotlight | 마우스 따라다니는 스포트라이트 | 쉬움 |
| lamp | 램프 조명 효과 | 쉬움 |
| aurora | 오로라 배경 | 중간 |
| grid-background | 그리드 패턴 배경 | 쉬움 |
| dot-background | 도트 패턴 배경 | 쉬움 |
| beams | 빛줄기 효과 | 중간 |
| meteors | 유성 효과 | 쉬움 |

### 카드/호버 효과 (Aceternity UI)
| 이름 | 설명 |
|-----|------|
| 3d-card | 마우스 따라 기울어지는 3D 카드 |
| card-hover | 호버시 빛나는 테두리 |
| bento-grid | 벤토 그리드 레이아웃 |
| infinite-cards | 무한 회전 카드 |

### 텍스트 효과 (Aceternity UI)
| 이름 | 설명 |
|-----|------|
| typewriter | 타이핑 효과 |
| text-generate | 글자 하나씩 나타남 |
| sparkles | 반짝이는 텍스트 |
| wavy-text | 물결치는 텍스트 |
| flip-words | 단어 플립 애니메이션 |

### Magic UI
| 이름 | 설명 |
|-----|------|
| marquee | 무한 스크롤 (로고 나열 등) |
| dock | macOS 스타일 독 |
| animated-list | 애니메이션 리스트 |
| particles | 파티클 배경 |
| shimmer-button | 빛나는 버튼 |

## 복사 시 자동 처리

1. **의존성 체크** - framer-motion, clsx, tailwind-merge 있는지
2. **유틸 함수** - cn() 함수 있는지
3. **컴포넌트 코드** - components/ui/ 폴더에 추가
4. **사용 예시** - 어떻게 쓰는지 코드 예시 제공

## 직접 복사할 소스

$ARGUMENTS 에 컴포넌트명이 있으면:
1. 해당 컴포넌트 공식 사이트에서 코드 확인
2. 프로젝트 구조에 맞게 수정
3. 필요한 의존성 안내
4. 사용 예시 제공

**참고 사이트:**
- Aceternity UI: https://ui.aceternity.com/components
- Magic UI: https://magicui.design/docs/components
- shadcn/ui: https://ui.shadcn.com/docs/components
