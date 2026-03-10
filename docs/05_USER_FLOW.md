# User Flow: 성락교회 웹페이지

## 1. 전체 사이트맵

```mermaid
graph TB
    subgraph Public["공개 페이지"]
        HOME[메인 홈]
        ABOUT[교회소개]
        WORSHIP[예배안내]
        SERMON[설교/영상]
        NEWCOMER[새가족안내]
        NEWS[교회소식]
        CONTACT[문의/연락처]
    end

    subgraph Admin["관리자 페이지"]
        ADMIN_LOGIN[로그인]
        ADMIN_DASH[대시보드]
        ADMIN_NOTICE[공지관리]
        ADMIN_WORSHIP[예배관리]
        ADMIN_CHURCH[교회소개관리]
        ADMIN_LIVE[라이브설정]
        ADMIN_INQUIRY[문의관리]
        ADMIN_SERMON[설교동기화]
        ADMIN_USER[계정관리]
    end

    HOME --> ABOUT
    HOME --> WORSHIP
    HOME --> SERMON
    HOME --> NEWCOMER
    HOME --> NEWS
    HOME --> CONTACT

    ADMIN_LOGIN --> ADMIN_DASH
    ADMIN_DASH --> ADMIN_NOTICE
    ADMIN_DASH --> ADMIN_WORSHIP
    ADMIN_DASH --> ADMIN_CHURCH
    ADMIN_DASH --> ADMIN_LIVE
    ADMIN_DASH --> ADMIN_INQUIRY
    ADMIN_DASH --> ADMIN_SERMON
    ADMIN_DASH --> ADMIN_USER
```

## 2. 메인 페이지 사용자 흐름

```mermaid
flowchart TD
    START([사용자 방문]) --> HERO[히어로 섹션 확인]

    HERO --> |라이브 중| LIVE_BADGE[라이브 배지 표시]
    LIVE_BADGE --> CLICK_LIVE{라이브 클릭?}
    CLICK_LIVE --> |Yes| WATCH_LIVE[라이브 시청]
    CLICK_LIVE --> |No| SCROLL

    HERO --> |라이브 아님| SCROLL[스크롤 다운]

    SCROLL --> SERMON_SECTION[설교 섹션]
    SERMON_SECTION --> |최신 설교 클릭| SERMON_DETAIL[설교 상세]
    SERMON_SECTION --> |더보기 클릭| SERMON_LIST[설교 목록 페이지]

    SCROLL --> ABOUT_SECTION[교회 소개 섹션]
    ABOUT_SECTION --> |자세히 보기| ABOUT_PAGE[교회소개 페이지]

    SCROLL --> NEWS_SECTION[소식 섹션]
    NEWS_SECTION --> |공지 클릭| NEWS_DETAIL[공지 상세]

    SCROLL --> NEWCOMER_CTA[새가족 환영 CTA]
    NEWCOMER_CTA --> |클릭| NEWCOMER_PAGE[새가족 페이지]

    style LIVE_BADGE fill:#ff6b6b
    style NEWCOMER_CTA fill:#4ecdc4
```

## 3. 설교 시청 흐름

```mermaid
sequenceDiagram
    participant U as 사용자
    participant FE as 프론트엔드
    participant API as API
    participant YT as YouTube

    U->>FE: 설교 페이지 접속
    FE->>API: GET /api/v1/sermons?playlist=sunday
    API-->>FE: 설교 목록 반환
    FE->>FE: 목록 렌더링

    U->>FE: 설교 영상 클릭
    FE->>API: GET /api/v1/sermons/:id
    API-->>FE: 설교 상세 정보
    FE->>YT: 유튜브 플레이어 로드
    YT-->>FE: 영상 재생

    U->>FE: 재생목록 탭 변경 (수요예배)
    FE->>API: GET /api/v1/sermons?playlist=wednesday
    API-->>FE: 수요예배 목록
    FE->>FE: 목록 업데이트
```

## 4. 새가족 문의 흐름

```mermaid
flowchart TD
    START([새가족 페이지 방문]) --> INFO[안내 정보 확인]

    INFO --> FORM[문의 폼 작성]
    FORM --> FILL_NAME[이름 입력]
    FILL_NAME --> FILL_PHONE[연락처 입력]
    FILL_PHONE --> FILL_MSG[문의 내용 입력]
    FILL_MSG --> SELECT_CONTACT[선호 연락 방법 선택]
    SELECT_CONTACT --> SUBMIT{제출}

    SUBMIT --> |성공| SUCCESS[접수 완료 메시지]
    SUCCESS --> THANKS[감사 화면]

    SUBMIT --> |실패| ERROR[에러 메시지]
    ERROR --> FORM

    subgraph API["API 호출"]
        SUBMIT --> |POST /api/v1/newcomer-inquiries| SAVE[DB 저장]
        SAVE --> NOTIFY[관리자 알림]
    end

    style SUCCESS fill:#4ecdc4
    style ERROR fill:#ff6b6b
```

## 5. 관리자 로그인 흐름

```mermaid
sequenceDiagram
    participant A as 관리자
    participant FE as 프론트엔드
    participant API as API
    participant LS as LocalStorage

    A->>FE: /admin 접속
    FE->>LS: 토큰 확인

    alt 토큰 없음
        LS-->>FE: null
        FE->>FE: 로그인 페이지로 리다이렉트
        A->>FE: 이메일/비밀번호 입력
        FE->>API: POST /api/v1/auth/login
        API-->>FE: { accessToken, refreshToken, user }
        FE->>LS: 토큰 저장
        FE->>FE: 대시보드로 이동
    else 토큰 있음
        LS-->>FE: accessToken
        FE->>API: GET /api/v1/auth/me
        alt 토큰 유효
            API-->>FE: { user }
            FE->>FE: 대시보드 표시
        else 토큰 만료
            API-->>FE: 401 Unauthorized
            FE->>API: POST /api/v1/auth/refresh
            API-->>FE: 새 토큰
            FE->>LS: 토큰 갱신
        end
    end
```

## 6. 공지사항 관리 흐름

```mermaid
flowchart TD
    START([관리자 대시보드]) --> NOTICE_MENU[공지사항 관리 클릭]
    NOTICE_MENU --> LIST[공지 목록 조회]

    LIST --> |GET /api/v1/admin/notices| DISPLAY[목록 표시]

    DISPLAY --> CREATE{새 공지 작성}
    CREATE --> FORM[작성 폼]
    FORM --> FILL[제목, 내용, 카테고리 입력]
    FILL --> |POST /api/v1/admin/notices| SAVE_NEW[저장]
    SAVE_NEW --> LIST

    DISPLAY --> EDIT{수정}
    EDIT --> EDIT_FORM[수정 폼]
    EDIT_FORM --> |PUT /api/v1/admin/notices/:id| SAVE_EDIT[저장]
    SAVE_EDIT --> LIST

    DISPLAY --> DELETE{삭제}
    DELETE --> CONFIRM[삭제 확인]
    CONFIRM --> |DELETE /api/v1/admin/notices/:id| REMOVE[삭제]
    REMOVE --> LIST

    DISPLAY --> PIN{고정 토글}
    PIN --> |PUT /api/v1/admin/notices/:id| UPDATE_PIN[고정 상태 변경]
    UPDATE_PIN --> LIST
```

## 7. 라이브 스트림 설정 흐름

```mermaid
sequenceDiagram
    participant A as 관리자
    participant FE as 프론트엔드
    participant API as API
    participant PUBLIC as 공개 페이지

    A->>FE: 라이브 설정 페이지
    FE->>API: GET /api/v1/admin/livestream
    API-->>FE: 현재 설정 반환

    A->>FE: 라이브 ON + YouTube ID 입력
    FE->>API: PUT /api/v1/admin/livestream
    Note over API: { isLive: true, youtubeId: "xxx", title: "주일예배" }
    API-->>FE: 업데이트 완료

    Note over PUBLIC: 메인 페이지 실시간 반영
    PUBLIC->>API: GET /api/v1/livestream
    API-->>PUBLIC: { isLive: true, ... }
    PUBLIC->>PUBLIC: 라이브 배지 표시 + 영상 임베드
```

## 8. 유튜브 설교 동기화 흐름

```mermaid
flowchart TD
    START([설교 동기화 페이지]) --> SELECT[재생목록 선택]
    SELECT --> SYNC_BTN[동기화 버튼 클릭]

    SYNC_BTN --> |POST /api/v1/admin/sermons/sync| FETCH[YouTube API 호출]

    FETCH --> |재생목록 영상 조회| PARSE[데이터 파싱]
    PARSE --> COMPARE[기존 데이터와 비교]

    COMPARE --> NEW{새 영상?}
    NEW --> |Yes| INSERT[DB에 추가]
    NEW --> |No| UPDATE[조회수 등 업데이트]

    INSERT --> COMPLETE[동기화 완료]
    UPDATE --> COMPLETE

    COMPLETE --> RESULT[결과 표시]
    RESULT --> |추가: N개, 업데이트: M개| END([완료])

    subgraph YouTube["YouTube API"]
        FETCH
        PARSE
    end

    style YouTube fill:#ff0000,color:#fff
```

## 9. 페이지별 API 호출 매핑

| 페이지 | 초기 로드 API | 사용자 액션 API |
|--------|--------------|----------------|
| **메인** | `GET /sermons/latest`<br>`GET /notices?size=3`<br>`GET /livestream` | - |
| **교회소개** | `GET /church-info` | - |
| **예배안내** | `GET /worships` | - |
| **설교/영상** | `GET /sermons` | `GET /sermons?playlist=xxx`<br>`GET /sermons/:id` |
| **새가족** | - | `POST /newcomer-inquiries` |
| **교회소식** | `GET /notices` | `GET /notices/:id` |
| **관리자 로그인** | - | `POST /auth/login` |
| **관리자 대시보드** | `GET /admin/newcomer-inquiries?size=5` | - |

## 10. 에러 처리 흐름

```mermaid
flowchart TD
    API_CALL[API 호출] --> RESPONSE{응답}

    RESPONSE --> |200 OK| SUCCESS[성공 처리]
    RESPONSE --> |400 Bad Request| VALIDATION[입력값 에러 표시]
    RESPONSE --> |401 Unauthorized| AUTH[로그인 페이지로]
    RESPONSE --> |403 Forbidden| FORBIDDEN[권한 없음 표시]
    RESPONSE --> |404 Not Found| NOT_FOUND[404 페이지]
    RESPONSE --> |500 Server Error| SERVER_ERROR[에러 토스트]

    SERVER_ERROR --> RETRY{재시도?}
    RETRY --> |Yes| API_CALL
    RETRY --> |No| ERROR_PAGE[에러 페이지]

    style SUCCESS fill:#4ecdc4
    style VALIDATION fill:#ffd93d
    style AUTH fill:#ff6b6b
    style SERVER_ERROR fill:#ff6b6b
```
