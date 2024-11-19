// export const ALL_STATIONS = [...KBS_STATIONS, ...MBC_STATIONS, ...SBS_STATIONS, ...EBS_STATIONS, ...LOCAL_STATIONS, ...YTN_STATIONS, ...TBS_STATIONS, ...TBN_STATIONS, ...CBS_STATIONS, ...RELIGIOUS_STATIONS, ...SPECIAL_STATIONS];  

import {
  RadioStation,
  KBS_STATIONS,
  MBC_STATIONS,
  SBS_STATIONS,
  EBS_STATIONS,
  LOCAL_STATIONS,
  YTN_STATIONS,
  TBS_STATIONS,
  TBN_STATIONS,
  CBS_STATIONS,
  RELIGIOUS_STATIONS,
  SPECIAL_STATIONS,
} from './stations';


export interface StationCategory {
  id: string;
  name: string;
  stations: RadioStation[];
}

export const STATION_CATEGORIES: StationCategory[] = [
  {
    id: 'kbs',
    name: 'KBS',
    stations: KBS_STATIONS,
  },
  {
    id: 'mbc',
    name: 'MBC',
    stations: MBC_STATIONS,
  },
  {
    id: 'sbs',
    name: 'SBS',
    stations: SBS_STATIONS,
  },
  {
    id: 'ebs',
    name: 'EBS',
    stations: EBS_STATIONS,
  },
  {
    id: 'local',
    name: '지역방송',
    stations: LOCAL_STATIONS,
  },
  {
    id: 'ytn',
    name: 'YTN',
    stations: YTN_STATIONS,
  },
  {
    id: 'tbs',
    name: 'TBS',
    stations: TBS_STATIONS,
  },
  {
    id: 'tbn',
    name: 'TBN',
    stations: TBN_STATIONS,
  },
  {
    id: 'cbs',
    name: 'CBS',
    stations: CBS_STATIONS,
  },
  {
    id: 'religious',
    name: '종교방송',
    stations: RELIGIOUS_STATIONS,
  },
  {
    id: 'special',
    name: '특수방송',
    stations: SPECIAL_STATIONS,
  },
  
]