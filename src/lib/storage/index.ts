import {
  STORAGE_KEYS,
  initialAdmins,
  initialSermons,
  initialNotices,
  initialWorships,
  initialChurchInfo,
  initialLiveStream,
  initialNewcomerInquiries,
} from "@/mocks/data/initial";

// LocalStorage 유틸리티
export function getStorageItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// LocalStorage 초기화
export function initializeStorage(): void {
  if (typeof window === "undefined") return;

  const isInitialized = localStorage.getItem("sungrak_initialized");
  if (isInitialized) return;

  localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(initialAdmins));
  localStorage.setItem(STORAGE_KEYS.SERMONS, JSON.stringify(initialSermons));
  localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(initialNotices));
  localStorage.setItem(STORAGE_KEYS.WORSHIPS, JSON.stringify(initialWorships));
  localStorage.setItem(
    STORAGE_KEYS.CHURCH_INFO,
    JSON.stringify(initialChurchInfo)
  );
  localStorage.setItem(
    STORAGE_KEYS.LIVESTREAM,
    JSON.stringify(initialLiveStream)
  );
  localStorage.setItem(
    STORAGE_KEYS.NEWCOMER_INQUIRIES,
    JSON.stringify(initialNewcomerInquiries)
  );

  localStorage.setItem("sungrak_initialized", "true");
}

// LocalStorage 리셋
export function resetStorage(): void {
  if (typeof window === "undefined") return;

  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
  localStorage.removeItem("sungrak_initialized");
  initializeStorage();
}

export { STORAGE_KEYS };
