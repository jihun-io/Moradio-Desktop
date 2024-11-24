import { create } from "zustand";
import Hls from "hls.js";

// localStorage 접근을 위한 안전한 함수
const getInitialVolume = () => {
  if (typeof window !== "undefined") {
    return Number(localStorage.getItem("radio-volume")) || 1;
  }
  return 1;
};

interface Station {
  id: string;
  name: string;
  streamUrl: string;
  color?: string;
  logo: string;
}

interface AudioStore {
  currentStation: Station | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  hls: Hls | null; // any 대신 Hls 타입 사용
  audioElement: HTMLAudioElement | null;
  recentStations: Station[];

  // Actions
  setStation: (station: Station) => Promise<void>;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  initAudio: (audioElement: HTMLAudioElement) => void;
  clearHistory: () => void;
  updateRecentStations: (stations: Station[]) => void; // 메서드 추가
}

// 로컬스토리지 키
const RECENT_STATIONS_KEY = "radio-recent-stations-3";

// 로컬스토리지에서 최근 재생 목록 불러오기
const loadRecentStations = (): Station[] => {
  try {
    const stored = localStorage.getItem(RECENT_STATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load recent stations:", error);
    return [];
  }
};

// 로컬스토리지에 최근 재생 목록 저장
const saveRecentStations = (stations: Station[]) => {
  try {
    localStorage.setItem(RECENT_STATIONS_KEY, JSON.stringify(stations));
  } catch (error) {
    console.error("Failed to save recent stations:", error);
  }
};

// 로컬스토리지에 저장된 최근 재생 목록 선택 삭제
export const removeRecentStation = (stationUrl: string) => {
  const stations = loadRecentStations();
  const updatedStations = stations.filter((s) => s.streamUrl !== stationUrl);
  saveRecentStations(updatedStations);
  // store 상태 업데이트 추가
  useAudioStore.getState().updateRecentStations(updatedStations);
};

export const useAudioStore = create<AudioStore>((set, get) => ({
  currentStation: null,
  isPlaying: false,
  isLoading: false,
  volume: getInitialVolume(), // 초기값 설정
  hls: null,
  audioElement: null,
  recentStations: loadRecentStations(),

  setStation: async (station) => {
    const { hls, audioElement, recentStations } = get(); // recentStations를 get()에서 가져오기

    try {
      set({ isLoading: true });
      // 최근 재생 목록 업데이트
      const updatedHistory = [
        station,
        ...recentStations.filter((s) => s.streamUrl !== station.streamUrl), // 중복 제거
      ];

      // 최근 재생 목록 저장
      saveRecentStations(updatedHistory);

      // Workers URL로 직접 요청
      const response = await fetch(
        `${window.electron.env.API_URL}/stream-json/${station.streamUrl}`
      );

      // 리다이렉트된 URL 가져오기
      const result = await response.json();
      const finalUrl = result.url;

      if (hls) {
        hls.destroy();
      }

      if (audioElement && Hls.isSupported()) {
        const newHls = new Hls();
        newHls.loadSource(finalUrl);
        newHls.attachMedia(audioElement);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          audioElement.play().catch(console.error);
          set({
            currentStation: station,
            recentStations: updatedHistory, // 상태 업데이트에 최근 재생 목록 추가
            hls: newHls,
            isPlaying: true,
            isLoading: false,
          });
        });
      } else if (audioElement?.canPlayType("application/vnd.apple.mpegurl")) {
        audioElement.src = finalUrl;
        audioElement.play().catch(console.error);
        set({
          currentStation: station,
          recentStations: updatedHistory, // 상태 업데이트에 최근 재생 목록 추가
          isPlaying: true,
        });
      }
    } catch (error) {
      console.error("Failed to load station:", error);
      set({ isPlaying: false, isLoading: false });
    }
  },

  togglePlay: () => {
    const { audioElement, isPlaying, hls, currentStation } = get();
    if (!audioElement) return;

    if (isPlaying) {
      // 완전 정지
      if (hls) {
        hls.destroy();
        set({ hls: null });
      }
      audioElement.src = "";
      audioElement.load();
      set({ isPlaying: false });
    } else if (currentStation) {
      // 재시작
      set({ isLoading: true });

      fetch(
        `${window.electron.env.API_URL}/stream-json/${currentStation.streamUrl}`
      )
        .then(async (response) => {
          const result = await response.json();
          const finalUrl = result.url;

          if (Hls.isSupported()) {
            const newHls = new Hls();
            newHls.loadSource(finalUrl);
            newHls.attachMedia(audioElement);

            newHls.on(Hls.Events.MANIFEST_PARSED, () => {
              audioElement.play().catch(console.error);
              set({
                hls: newHls,
                isPlaying: true,
                isLoading: false,
              });
            });
          } else if (
            audioElement.canPlayType("application/vnd.apple.mpegurl")
          ) {
            audioElement.src = finalUrl;
            audioElement
              .play()
              .then(() => {
                set({
                  isPlaying: true,
                  isLoading: false,
                });
              })
              .catch(console.error);
          }
        })
        .catch((error) => {
          console.error("Failed to restart playback:", error);
          set({ isLoading: false });
        });
    }
  },

  setVolume: (volume) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.volume = volume;
      localStorage.setItem("radio-volume", volume.toString());
      set({ volume });
    }
  },

  initAudio: (audioElement) => {
    set({ audioElement });
    audioElement.volume = get().volume;
  },

  clearHistory: () => {
    // clearHistory 메서드 구현 추가
    localStorage.removeItem(RECENT_STATIONS_KEY);
    set({ recentStations: [] });
  },

  updateRecentStations: (stations) => {
    set({ recentStations: stations });
  },
}));
