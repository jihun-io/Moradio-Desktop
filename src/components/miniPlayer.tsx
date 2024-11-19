import React, { useEffect, useRef } from "react";
import { useAudioStore } from "../store/useAudioStore";

const MiniPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentStation,
    isPlaying,
    isLoading,
    volume,
    togglePlay,
    setVolume,
    initAudio,
  } = useAudioStore();

  useEffect(() => {
    if (audioRef.current) {
      initAudio(audioRef.current);

      // 시스템 미디어 컨트롤 이벤트 리스너
      const audio = audioRef.current;

      const handlePlay = () => {
        useAudioStore.setState({ isPlaying: true });
      };

      const handlePause = () => {
        useAudioStore.setState({ isPlaying: false });
      };

      // 이벤트 리스너 등록
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);

      // 정리(cleanup) 함수
      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      };
    }
  }, [initAudio]);

  return (
    <section className="px-4 flex justify-between items-center">
      <audio ref={audioRef} />
      <h2 className="sr-only">플레이어</h2>
      <div className="flex items-center gap-x-4">
        {isLoading ? (
          <div
            role="status"
            className="w-16 h-16 flex justify-center items-center"
          >
            <svg
              className="w-8 h-8 text-gray-300 animate-spin"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-highlight"
              ></path>
            </svg>
          </div>
        ) : currentStation ? (
          <img
            src={
              !currentStation
                ? "./images/logo/logo-square.svg"
                : currentStation?.logo
            }
            width={64}
            height={64}
            className="w-16 h-16 object-contain rounded-md"
            alt="Moradio"
          />
        ) : (
          <img
            src="./images/logo/logo-square.svg"
            width={64}
            height={64}
            className="w-16 h-16 object-contain rounded-md"
            alt="Moradio"
          />
        )}

        {isLoading ? (
          <p className="font-bold">로드 중...</p>
        ) : currentStation ? (
          <p className="font-bold">{currentStation?.name}</p>
        ) : (
          <p className="font-bold">Moradio</p>
        )}
      </div>
      <div className="flex items-center justify-end w-2/4  gap-x-4">
        <div className="flex pl-4 items-center">
          <input
            className="volume-slider bg-gray-400"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>

        {!currentStation ? (
          <button className="p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#dc2e2e"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : isPlaying ? (
          <button className="p-4" onClick={togglePlay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#dc2e2e"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button className="p-4" onClick={togglePlay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#dc2e2e"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default MiniPlayer;
