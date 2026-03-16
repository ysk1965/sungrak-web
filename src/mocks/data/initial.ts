import type {
  Admin,
  Sermon,
  Notice,
  Worship,
  ChurchInfo,
  LiveStream,
  NewcomerInquiry,
} from "@/types";

// 관리자 초기 데이터
export const initialAdmins: Admin[] = [
  {
    id: "admin_001",
    email: "admin@sungrak.com",
    name: "최고관리자",
    role: "SUPER_ADMIN",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// 설교 초기 데이터
export const initialSermons: Sermon[] = [
  {
    id: "sermon_001",
    title: "2024년을 시작하며 - 새로운 은혜",
    description:
      "새해를 맞이하며 하나님의 새로운 은혜를 선포합니다. 올 한 해도 주님의 인도하심 가운데 승리하는 한 해가 되길 기도합니다.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    playlist: "sunday",
    preacher: "담임목사",
    publishedAt: "2024-01-07T10:00:00Z",
    duration: "PT45M30S",
    viewCount: 1234,
    createdAt: "2024-01-07T12:00:00Z",
    updatedAt: "2024-01-07T12:00:00Z",
  },
  {
    id: "sermon_002",
    title: "믿음의 여정 - 아브라함의 순종",
    description:
      "아브라함의 믿음과 순종을 통해 우리의 신앙을 돌아봅니다.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    playlist: "sunday",
    preacher: "담임목사",
    publishedAt: "2024-01-14T10:00:00Z",
    duration: "PT42M15S",
    viewCount: 987,
    createdAt: "2024-01-14T12:00:00Z",
    updatedAt: "2024-01-14T12:00:00Z",
  },
  {
    id: "sermon_003",
    title: "수요예배 - 기도의 능력",
    description: "기도로 승리하는 삶에 대해 말씀합니다.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    playlist: "wednesday",
    preacher: "부목사",
    publishedAt: "2024-01-10T19:30:00Z",
    duration: "PT35M00S",
    viewCount: 456,
    createdAt: "2024-01-10T21:00:00Z",
    updatedAt: "2024-01-10T21:00:00Z",
  },
  {
    id: "sermon_004",
    title: "새벽기도 - 말씀 묵상",
    description: "시편을 통한 새벽 묵상입니다.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    playlist: "dawn",
    preacher: "담임목사",
    publishedAt: "2024-01-15T05:00:00Z",
    duration: "PT25M00S",
    viewCount: 234,
    createdAt: "2024-01-15T06:00:00Z",
    updatedAt: "2024-01-15T06:00:00Z",
  },
];

// 공지사항 초기 데이터
export const initialNotices: Notice[] = [
  {
    id: "notice_001",
    title: "2024년 신년 감사예배 안내",
    content:
      "<p>2024년 1월 1일 오전 10시, 신년 감사예배가 있습니다. 온 성도님들의 참여를 부탁드립니다.</p>",
    category: "event",
    isPinned: true,
    viewCount: 500,
    createdAt: "2024-01-01T09:00:00Z",
    updatedAt: "2024-01-01T09:00:00Z",
  },
  {
    id: "notice_002",
    title: "1월 주보",
    content: "<p>1월 첫째주 주보입니다.</p>",
    category: "weekly",
    isPinned: false,
    viewCount: 320,
    createdAt: "2024-01-07T08:00:00Z",
    updatedAt: "2024-01-07T08:00:00Z",
  },
  {
    id: "notice_003",
    title: "겨울 수련회 안내",
    content:
      "<p>청년부 겨울 수련회가 1월 말에 진행됩니다. 많은 참여 바랍니다.</p>",
    category: "news",
    isPinned: false,
    viewCount: 280,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
];

// 예배 정보 초기 데이터
export const initialWorships: Worship[] = [
  {
    id: "worship_001",
    name: "주일 1부 예배",
    day: "sunday",
    time: "07:00",
    location: "대예배실",
    description: "찬양과 말씀의 예배",
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
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
    updatedAt: "2024-01-01T00:00:00Z",
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
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "worship_004",
    name: "수요예배",
    day: "wednesday",
    time: "19:30",
    location: "대예배실",
    order: 4,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
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
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// 교회 소개 초기 데이터
export const initialChurchInfo: ChurchInfo = {
  greeting: {
    title: "담임목사 인사말",
    content: `성락교회에 오신 것을 환영합니다.

우리 교회는 "신실한 헌신, 긍휼한 사귐"이라는 비전 아래, 하나님과 이웃을 섬기는 공동체입니다.

예수 그리스도의 사랑 안에서 함께 성장하고, 세상을 변화시키는 빛과 소금이 되기를 소망합니다.

언제든지 편안한 마음으로 방문해 주세요.
여러분을 진심으로 환영합니다.`,
    pastorName: "담임목사",
    pastorImage: "/images/pastor.jpg",
  },
  vision: {
    title: "Sincere Devotion, Compassionate Fellowship",
    content:
      "주님과의 관계 안에서 믿음으로 살아가는 교회. 우리는 하나님을 사랑하고, 이웃을 사랑하며, 세상을 섬기는 공동체입니다.",
    values: ["신실한 헌신 (Sincere Devotion)", "긍휼한 사귐 (Compassionate Fellowship)"],
  },
  history: [
    { year: "1999", content: "성락교회 설립" },
    { year: "2005", content: "세계센터 건축" },
    { year: "2010", content: "신길본당 개원" },
    { year: "2015", content: "해외선교 확장" },
    { year: "2020", content: "온라인 예배 시스템 구축" },
  ],
  organization: {
    content:
      "성락교회는 담임목사를 중심으로 장로회, 각 부서가 유기적으로 협력하고 있습니다.",
    chartImage: "/images/org-chart.png",
  },
  location: {
    address: "서울시 구로구 신도림로 56-24",
    phone: "070-7300-6200",
    fax: "02-844-8711",
    coordinates: { lat: 37.5085, lng: 126.8915 },
  },
};

// 라이브 스트림 초기 데이터
export const initialLiveStream: LiveStream = {
  isLive: false,
  title: "",
  youtubeId: "",
  startedAt: "",
};

// 새가족 문의 초기 데이터
export const initialNewcomerInquiries: NewcomerInquiry[] = [];

// LocalStorage 키
export const STORAGE_KEYS = {
  AUTH: "sungrak_auth",
  ADMINS: "sungrak_admins",
  SERMONS: "sungrak_sermons",
  NOTICES: "sungrak_notices",
  WORSHIPS: "sungrak_worships",
  CHURCH_INFO: "sungrak_church_info",
  LIVESTREAM: "sungrak_livestream",
  NEWCOMER_INQUIRIES: "sungrak_newcomer_inquiries",
} as const;
