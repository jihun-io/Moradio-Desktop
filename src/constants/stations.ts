import bbsLogo from '../public/images/stations/bbs.svg';
import cbsLogo from '../public/images/stations/cbs.svg';
import cpbcLogo from '../public/images/stations/cpbc.svg';
import ebsLogo from '../public/images/stations/ebsfm.svg';
import febcLogo from '../public/images/stations/febc.svg';
import kbs1Logo from '../public/images/stations/kbs1.svg';
import kbs2Logo from '../public/images/stations/kbs2.svg';
import kbs3Logo from '../public/images/stations/kbs3.svg';
import kbs1fmLogo from '../public/images/stations/kbs1fm.svg';
import kbs2fmLogo from '../public/images/stations/kbs2fm.svg';
import kbshanminjokLogo from '../public/images/stations/kbshanminjok.svg';
import kookbangLogo from '../public/images/stations/kookbang.svg';
import kugakLogo from '../public/images/stations/kugak.svg';
import mbcfm4uLogo from '../public/images/stations/mbcfm4u.svg';
import mbcsfmLogo from '../public/images/stations/mbcsfm.svg';
import sbslovefmLogo from '../public/images/stations/sbslovefm.svg';
import sbspowerfmLogo from '../public/images/stations/sbspowerfm.svg';
import tbsefmLogo from '../public/images/stations/tbsefm.svg';
import tbsfmLogo from '../public/images/stations/tbsfm.svg';
import ytnLogo from '../public/images/stations/ytn.svg';
import tbnLogo from '../public/images/stations/tbn.svg';
import obsLogo from '../public/images/stations/obs.svg';
import ifmLogo from '../public/images/stations/ifm.svg';
import afnLogo from '../public/images/stations/afn.svg';
import wbsLogo from '../public/images/stations/wbs.svg';



export interface RadioStation {
  id: string;
  name: string;
  streamUrl: string;
  color?: string;
  logo: typeof import("*.svg").default;
}

// KBS 방송국
export const KBS_STATIONS: RadioStation[] = [
  {
    id: 'kbs1',
    name: 'KBS 1라디오',
    streamUrl: '?stn=kbs&ch=1radio',
    logo: kbs1Logo,
  },
  {
    id: 'kbs2',
    name: 'KBS 2라디오',
    streamUrl: '?stn=kbs&ch=2radio',
    logo: kbs2Logo,
  },
  {
    id: 'kbs3',
    name: 'KBS 3라디오',
    streamUrl: '?stn=kbs&ch=3radio',
    logo: kbs3Logo,
  },
  {
    id: 'kbs1fm',
    name: 'KBS 1FM',
    streamUrl: '?stn=kbs&ch=1fm',
    logo: kbs1fmLogo,
  },
  {
    id: 'kbs2fm',
    name: 'KBS 2FM',
    streamUrl: '?stn=kbs&ch=2fm',
    logo: kbs2fmLogo,
  },
  {
    id: 'kbshanminjok',
    name: 'KBS 한민족방송',
    streamUrl: '?stn=kbs&ch=hanminjok',
    logo: kbshanminjokLogo,
  },
];

// MBC 방송국
export const MBC_STATIONS: RadioStation[] = [
  {
    id: 'mbcsfm',
    name: 'MBC 표준FM',
    streamUrl: '?stn=mbc&ch=sfm',
    logo: mbcsfmLogo,
  },
  {
    id: 'mbcfm4u',
    name: 'MBC FM4U',
    streamUrl: '?stn=mbc&ch=fm4u',
    logo: mbcfm4uLogo,
  },
];

// SBS 방송국
export const SBS_STATIONS: RadioStation[] = [
  {
    id: 'sbslovefm',
    name: 'SBS 러브FM',
    streamUrl: '?stn=sbs&ch=lovefm',
    logo: sbslovefmLogo,
  },
  {
    id: 'sbspowerfm',
    name: 'SBS 파워FM',
    streamUrl: '?stn=sbs&ch=powerfm',
    logo: sbspowerfmLogo,
  },
];

// EBS
export const EBS_STATIONS: RadioStation[] = [
  {
    id: 'ebsfm',
    name: 'EBS FM',
    streamUrl: '?stn=ebs',
    logo: ebsLogo,
  },
];

// 지역 방송
export const LOCAL_STATIONS: RadioStation[] = [
  {
    id: 'obs',
    name: 'OBS 라디오',
    streamUrl: '?stn=obs',
    logo: obsLogo,
  },
  {
    id: 'ifm',
    name: 'iFM 경인방송',
    streamUrl: '?stn=ifm',
    logo: ifmLogo,
  },
];

// YTN
export const YTN_STATIONS: RadioStation[] = [
  {
    id: 'ytn',
    name: 'YTN 라디오',
    streamUrl: '?stn=ytn',
    logo: ytnLogo,
  },
];

// TBS
export const TBS_STATIONS: RadioStation[] = [
  {
    id: 'tbsfm',
    name: 'TBS FM',
    streamUrl: '?stn=tbs&ch=fm',
    logo: tbsfmLogo,
  },
  {
    id: 'tbsefm',
    name: 'TBS eFM',
    streamUrl: '?stn=tbs&ch=efm',
    logo: tbsefmLogo,
  },
];

// TBN
export const TBN_STATIONS: RadioStation[] = [
  {
    id: 'tbn',
    name: 'TBN 경인교통방송',
    streamUrl: '?stn=tbn',
    logo: tbnLogo,
  },
];

// CBS
export const CBS_STATIONS: RadioStation[] = [
  {
    id: 'cbssfm',
    name: 'CBS 표준FM',
    streamUrl: '?stn=cbs&ch=sfm',
    logo: cbsLogo,
  },
  {
    id: 'cbsmfm',
    name: 'CBS 음악FM',
    streamUrl: '?stn=cbs&ch=mfm',
    logo: cbsLogo,
  },
  {
    id: 'cbsjoy4u',
    name: 'CBS JOY4U',
    streamUrl: '?stn=cbs&ch=joy4u',
    logo: cbsLogo,
  },
];

// 종교방송
export const RELIGIOUS_STATIONS: RadioStation[] = [
  {
    id: 'febc',
    name: 'FEBC 서울극동방송',
    streamUrl: '?stn=febc',
    logo: febcLogo,
  },
  {
    id: 'bbs',
    name: 'BBS 서울불교방송',
    streamUrl: '?stn=bbs',
    logo: bbsLogo,
  },
  {
    id: 'cpbc',
    name: 'CPBC 가톨릭평화방송',
    streamUrl: '?stn=cpbc',
    logo: cpbcLogo,
  },
  {
    id: 'wbs',
    name: 'WBS 서울원음방송',
    streamUrl: '?stn=wbs',
    logo: wbsLogo,
  },
];

// 특수방송
export const SPECIAL_STATIONS: RadioStation[] = [
  {
    id: 'kookbang',
    name: '국방FM',
    streamUrl: '?stn=kookbang',
    logo: kookbangLogo,
  },
  {
    id: 'kugak',
    name: '국악방송',
    streamUrl: '?stn=kugak',
    logo: kugakLogo,
  },
  {
    id: 'afn',
    name: 'AFN FM Humphreys',
    streamUrl: '?stn=afn&city=humphreys',
    logo: afnLogo,
  },
];

export const ALL_STATIONS = [...KBS_STATIONS, ...MBC_STATIONS, ...SBS_STATIONS, ...EBS_STATIONS, ...LOCAL_STATIONS, ...YTN_STATIONS, ...TBS_STATIONS, ...TBN_STATIONS, ...CBS_STATIONS, ...RELIGIOUS_STATIONS, ...SPECIAL_STATIONS];  