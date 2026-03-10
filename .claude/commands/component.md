React 컴포넌트 생성기입니다.

## 사용법
`/component [컴포넌트명] [옵션]`

예시:
- `/component Button` - 기본 컴포넌트
- `/component UserCard with-test` - 테스트 포함
- `/component Modal with-story` - Storybook 스토리 포함
- `/component DataTable with-all` - 전부 포함

## 입력 파싱
$ARGUMENTS 에서 컴포넌트명과 옵션을 파싱합니다.
- 첫 번째 단어: 컴포넌트명 (PascalCase로 변환)
- `with-test`: 테스트 파일 생성
- `with-story`: Storybook 스토리 생성
- `with-all`: 테스트 + 스토리 모두

## 생성 규칙

### 컴포넌트 파일 (.tsx)
```typescript
// 함수형 컴포넌트 + TypeScript
// Props 인터페이스 분리
// forwardRef 필요시 적용
// 기본 export
```

### 구조
```
components/
  [ComponentName]/
    index.tsx          # re-export
    [ComponentName].tsx
    [ComponentName].test.tsx  # (옵션)
    [ComponentName].stories.tsx  # (옵션)
    types.ts           # props가 복잡할 때만
```

### 템플릿 원칙
1. Props는 interface로 정의 (ComponentNameProps)
2. children은 ReactNode 타입
3. className은 항상 받을 수 있게
4. 이벤트 핸들러는 on- 접두사
5. 기본값은 destructuring에서 설정

## 생성 전 질문
컴포넌트명만 있고 옵션이 없으면 물어보기:
1. 어떤 props가 필요한가요?
2. 테스트/스토리 파일도 만들까요?
3. 어느 폴더에 만들까요? (기본: components/)
