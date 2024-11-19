import { REGIONS } from "./constants/regions";
import { Embla, EmblaSlide, EmblaContainer } from "./components/embla";
import MiniPlayer from "./components/miniPlayer";
import { useAudioStore, removeRecentStation } from "./store/useAudioStore";
import { useRegionStore } from "./store/useRegionStore";
import StationsList from "./components/stationsList";
import { useEffect, useRef } from "react";

export default function Home() {
  const { recentStations, setStation } = useAudioStore();
  const { selectedRegions, setSelectedRegions } = useRegionStore();

  const handleRegionToggle = (regionId: string) => {
    // 최소 1개 지역은 선택되어야 함
    if (selectedRegions.length === 1 && selectedRegions.includes(regionId)) {
      return;
    }

    setSelectedRegions(
      selectedRegions.includes(regionId)
        ? selectedRegions.filter((r) => r !== regionId)
        : [...selectedRegions, regionId]
    );
  };

  const dialogRef = useRef<HTMLDialogElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const handleDialogOpen = () => {
    if (!dialogRef.current || !mainRef.current) return;

    mainRef.current.classList.add("blur", "pointer-events-none");
    document.body.classList.add("overflow-hidden");
    dialogRef.current.showModal();
  };

  const handleDialogClose = () => {
    if (!dialogRef.current || !mainRef.current) return;

    mainRef.current.classList.remove("blur", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
    dialogRef.current.close();
  };

  // 다이얼로그 외부 클릭 처리
  useEffect(() => {
    const dialog = dialogRef.current;

    const handleOutsideClick = (e: Event) => {
      if (e.target === dialog) {
        handleDialogClose();
      }
    };

    dialog?.addEventListener("click", handleOutsideClick);

    return () => {
      dialog?.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  interface LocalButtonProps {
    id?: string;
    active?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
  }

  const LocalButton: React.FC<LocalButtonProps> = ({
    active,
    children,
    onClick,
  }) => (
    <button
      className={`py-1 px-2 border-2 rounded-lg ${
        active ? "bg-highlight text-white" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <>
      <header className="py-8 px-8 sticky top-0 bg-background z-[100] shadow-sm flex justify-between">
        <h1 className="flex justify-center items-center text-4xl font-bold">
          <img src="/images/logo/logo-text.svg" width={120} alt="Moradio" />
        </h1>
        <button className="p-2" onClick={handleDialogOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
      </header>
      <main className="px-8" ref={mainRef}>
        <section>
          <h2 className="py-4 text-2xl font-bold">최근 재생한 방송국</h2>
          {recentStations.length > 0 ? (
            <Embla>
              <EmblaContainer>
                {recentStations.map((station) => (
                  <EmblaSlide
                    key={station.streamUrl}
                    onClick={() => setStation(station)}
                    className="recent-station relative"
                  >
                    <button
                      className="recent-station-del-btn absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 shadow-lg rounded-full bg-white p-1 "
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentStation(station.streamUrl);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <img
                      className="rounded-lg mb-2"
                      src={station.logo}
                      alt={station.name}
                    />
                    <h3 className="text-sm">{station.name}</h3>
                  </EmblaSlide>
                ))}
              </EmblaContainer>
            </Embla>
          ) : (
            <p className="py-4">최근 재생한 방송국 목록이 여기에 표시됩니다.</p>
          )}
        </section>
        <StationsList />
        <section className="pt-16 pb-4 text-xs">
          <h2 className="sr-only">Moradio에 관하여...</h2>
          <hr className="py-4" />
          <p className="mb-4">
            <q>모두 모아둔 모두의 라디오, Moradio.</q>
          </p>
          <p>
            Moradio는 각 방송사의 공개된 라디오 스트리밍 URL을 접속자의
            디바이스로 중개하는 애플리케이션이며, Moradio는 방송을 절대
            녹취하거나 재송신하지 않습니다.
          </p>
          <p>라디오 방송의 저작권은 각 방송사에게 있습니다.</p>
          <p className="mt-4">
            Copyright © 2024 Jihun Kim. All rights reserved.
          </p>
        </section>
      </main>
      <footer className="py-4 bg-background sticky bottom-0 z-[100] shadow-inner">
        <MiniPlayer />
      </footer>
      <dialog
        className="w-4/5 h-4/5 max-w-[25rem] max-h-fit rounded-lg p-8"
        ref={dialogRef}
      >
        <div className="flex justify-between items-center mb-4 max-w-full">
          <h2 className="text-xl font-bold">지역 선택</h2>
          <button onClick={handleDialogClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-wrap gap-y-4 gap-x-2 justify-start">
          {REGIONS.map((region) => (
            <li key={region.id}>
              <LocalButton
                active={selectedRegions.includes(region.id)}
                onClick={() => handleRegionToggle(region.id)}
              >
                {region.name}
              </LocalButton>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
