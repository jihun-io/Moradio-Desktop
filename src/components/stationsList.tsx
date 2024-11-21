import { ReactElement, useState, useEffect } from "react";
import { useAudioStore } from "../store/useAudioStore";
import { useRegionStore } from "../store/useRegionStore";
import React from "react";

interface Station {
  category: string;
  id: string;
  name: string;
  type: string;
  stations: {
    city: string;
    name: string;
  }[];
  channels?: {
    id: string;
    name: string;
  }[];
}

export default function StationsList(): ReactElement {
  const { setStation } = useAudioStore();
  const { selectedRegions } = useRegionStore();

  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStations = async () => {
      try {
        // selectedRegions 값을 직접 사용
        const selectedRegionsStr = selectedRegions.join(",");

        const res = await fetch(
          `${window.electron.env.API_URL}/stations?region=korea,${selectedRegionsStr}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        if (isMounted) {
          setStations(data || []);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error instanceof Error
              ? error.message
              : "데이터를 불러오는데 실패했습니다"
          );
          console.error(error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStations();

    return () => {
      isMounted = false;
    };
  }, [selectedRegions]); // selectedRegions를 의존성 배열에 추가

  if (error) return <div>Error: {error}</div>;
  if (isLoading)
    return (
      <section className="">
        <h2 className="font-bold text-xl">로드 중...</h2>
      </section>
    );
  if (!stations.length) return <div>방송국 정보가 없습니다.</div>;

  const groupedStations = stations.reduce((acc, station) => {
    // category가 없는 경우 방송사 이름을 카테고리로 사용
    let category = station.category || station.name;

    if (category === "religion") {
      category = "종교 방송";
    } else if (category === "local") {
      category = "지역 방송";
    } else if (category === "traffic") {
      category = "TBN";
    } else if (category === "extra") {
      category = "기타";
    }

    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(station);
    return acc;
  }, {} as Record<string, Station[]>);

  return (
    <>
      {Object.entries(groupedStations).map(([category, stationList]) => (
        <section key={category}>
          <h2 className="py-4 text-2xl font-bold">{category}</h2>
          <div className="overflow-x-auto overflow-y-hidden scrollbar-custom">
            <ul className="w-fit flex flex-row gap-x-4 pb-4">
              {stationList.map((station) => {
                if (station.channels) {
                  return station.stations.map((localChannel) =>
                    station.channels!.map((channel) => (
                      <li
                        className="w-32"
                        key={`${station.id}-${channel.name}`}
                        onClick={() =>
                          setStation({
                            id: `${station.id.toLowerCase()}${channel.id.toLowerCase()}`,
                            streamUrl: `?stn=${station.id.toLowerCase()}&ch=${
                              channel.id
                            }${
                              localChannel.city === "korea" ||
                              localChannel.city === "seoul"
                                ? ""
                                : `&city=${localChannel.city}`
                            }`,
                            name: `${localChannel.name} ${channel.name}`,
                            logo: `./images/stations/${station.id.toLowerCase()}${channel.id.toLowerCase()}.svg`,
                          })
                        }
                      >
                        <img
                          className="rounded-lg mb-2"
                          src={`./images/stations/${station.id.toLowerCase()}${channel.id.toLowerCase()}.svg`}
                          alt={station.name}
                        />
                        <h3 className="text-sm">{`${localChannel.name} ${channel.name}`}</h3>
                      </li>
                    ))
                  );
                } else {
                  return station.stations.map((channel) => (
                    <li
                      className="w-32"
                      key={channel.name}
                      onClick={() =>
                        setStation({
                          id: `${station.id}`,
                          streamUrl: `?stn=${station.id.toLowerCase()}${
                            channel.city === "korea" || channel.city === "seoul"
                              ? ""
                              : `&city=${channel.city}`
                          }`,
                          name: `${channel.name}`,
                          logo: `./images/stations/${station.id}.svg`,
                        })
                      }
                    >
                      <img
                        className="rounded-lg mb-2"
                        src={`./images/stations/${station.id}.svg`}
                        alt={channel.name}
                      />
                      <h3 className="text-sm">{channel.name}</h3>
                    </li>
                  ));
                }
              })}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
