const bbsLogo: string = "./images/stations/bbs.svg";
const cbsLogo: string = "./images/stations/cbs.svg";
const cpbcLogo: string = "./images/stations/cpbc.svg";
const ebsLogo: string = "./images/stations/ebsfm.svg";
const febcLogo: string = "./images/stations/febc.svg";
const kbs1Logo: string = "./images/stations/kbs1.svg";
const kbs2Logo: string = "./images/stations/kbs2.svg";
const kbs3Logo: string = "./images/stations/kbs3.svg";
const kbs1fmLogo: string = "./images/stations/kbs1fm.svg";
const kbs2fmLogo: string = "./images/stations/kbs2fm.svg";
const kbshanminjokLogo: string = "./images/stations/kbshanminjok.svg";
const kookbangLogo: string = "./images/stations/kookbang.svg";
const kugakLogo: string = "./images/stations/kugak.svg";
const mbcfm4uLogo: string = "./images/stations/mbcfm4u.svg";
const mbcsfmLogo: string = "./images/stations/mbcsfm.svg";
const sbslovefmLogo: string = "./images/stations/sbslovefm.svg";
const sbspowerfmLogo: string = "./images/stations/sbspowerfm.svg";
const tbsefmLogo: string = "./images/stations/tbsefm.svg";
const tbsfmLogo: string = "./images/stations/tbsfm.svg";
const ytnLogo: string = "./images/stations/ytn.svg";
const tbnLogo: string = "./images/stations/tbn.svg";
const obsLogo: string = "./images/stations/obs.svg";
const ifmLogo: string = "./images/stations/ifm.svg";
const afnLogo: string = "./images/stations/afn.svg";
const wbsLogo: string = "./images/stations/wbs.svg";

export interface RadioStation {
  id: string;
  name: string;
  streamUrl: string;
  color?: string;
  logo: string;
}

// KBS 방송국
export const KBS_STATIONS: RadioStation[] = [
  {
    id: "kbs1",
    name: "KBS 1라디오",
    streamUrl: "?stn=kbs&ch=1radio",
    logo: kbs1Logo,
  },
  {
    id: "kbs2",
    name: "KBS 2라디오",
    streamUrl: "?stn=kbs&ch=2radio",
    logo: kbs2Logo,
  },
  {
    id: "kbs3",
    name: "KBS 3라디오",
    streamUrl: "?stn=kbs&ch=3radio",
    logo: kbs3Logo,
  },
  {
    id: "kbs1fm",
    name: "KBS 1FM",
    streamUrl: "?stn=kbs&ch=1fm",
    logo: kbs1fmLogo,
  },
  {
    id: "kbs2fm",
    name: "KBS 2FM",
    streamUrl: "?stn=kbs&ch=2fm",
    logo: kbs2fmLogo,
  },
  {
    id: "kbshanminjok",
    name: "KBS 한민족방송",
    streamUrl: "?stn=kbs&ch=hanminjok",
    logo: kbshanminjokLogo,
  },
];

// MBC 방송국
export const MBC_STATIONS: RadioStation[] = [
  {
    id: "mbcsfm",
    name: "MBC 표준FM",
    streamUrl: "?stn=mbc&ch=sfm",
    logo: mbcsfmLogo,
  },
  {
    id: "mbcfm4u",
    name: "MBC FM4U",
    streamUrl: "?stn=mbc&ch=fm4u",
    logo: mbcfm4uLogo,
  },
];

// SBS 방송국
export const SBS_STATIONS: RadioStation[] = [
  {
    id: "sbslovefm",
    name: "SBS 러브FM",
    streamUrl: "?stn=sbs&ch=lovefm",
    logo: sbslovefmLogo,
  },
  {
    id: "sbspowerfm",
    name: "SBS 파워FM",
    streamUrl: "?stn=sbs&ch=powerfm",
    logo: sbspowerfmLogo,
  },
];

// EBS
export const EBS_STATIONS: RadioStation[] = [
  {
    id: "ebsfm",
    name: "EBS FM",
    streamUrl: "?stn=ebs",
    logo: ebsLogo,
  },
];

// 지역 방송
export const LOCAL_STATIONS: RadioStation[] = [
  {
    id: "obs",
    name: "OBS 라디오",
    streamUrl: "?stn=obs",
    logo: obsLogo,
  },
  {
    id: "ifm",
    name: "iFM 경인방송",
    streamUrl: "?stn=ifm",
    logo: ifmLogo,
  },
];

// YTN
export const YTN_STATIONS: RadioStation[] = [
  {
    id: "ytn",
    name: "YTN 라디오",
    streamUrl: "?stn=ytn",
    logo: ytnLogo,
  },
];

// TBS
export const TBS_STATIONS: RadioStation[] = [
  {
    id: "tbsfm",
    name: "TBS FM",
    streamUrl: "?stn=tbs&ch=fm",
    logo: tbsfmLogo,
  },
  {
    id: "tbsefm",
    name: "TBS eFM",
    streamUrl: "?stn=tbs&ch=efm",
    logo: tbsefmLogo,
  },
];

// TBN
export const TBN_STATIONS: RadioStation[] = [
  {
    id: "tbn",
    name: "TBN 경인교통방송",
    streamUrl: "?stn=tbn",
    logo: tbnLogo,
  },
];

// CBS
export const CBS_STATIONS: RadioStation[] = [
  {
    id: "cbssfm",
    name: "CBS 표준FM",
    streamUrl: "?stn=cbs&ch=sfm",
    logo: cbsLogo,
  },
  {
    id: "cbsmfm",
    name: "CBS 음악FM",
    streamUrl: "?stn=cbs&ch=mfm",
    logo: cbsLogo,
  },
  {
    id: "cbsjoy4u",
    name: "CBS JOY4U",
    streamUrl: "?stn=cbs&ch=joy4u",
    logo: cbsLogo,
  },
];

// 종교방송
export const RELIGIOUS_STATIONS: RadioStation[] = [
  {
    id: "febc",
    name: "FEBC 서울극동방송",
    streamUrl: "?stn=febc",
    logo: febcLogo,
  },
  {
    id: "bbs",
    name: "BBS 서울불교방송",
    streamUrl: "?stn=bbs",
    logo: bbsLogo,
  },
  {
    id: "cpbc",
    name: "CPBC 가톨릭평화방송",
    streamUrl: "?stn=cpbc",
    logo: cpbcLogo,
  },
  {
    id: "wbs",
    name: "WBS 서울원음방송",
    streamUrl: "?stn=wbs",
    logo: wbsLogo,
  },
];

// 특수방송
export const SPECIAL_STATIONS: RadioStation[] = [
  {
    id: "kookbang",
    name: "국방FM",
    streamUrl: "?stn=kookbang",
    logo: kookbangLogo,
  },
  {
    id: "kugak",
    name: "국악방송",
    streamUrl: "?stn=kugak",
    logo: kugakLogo,
  },
  {
    id: "afn",
    name: "AFN FM Humphreys",
    streamUrl: "?stn=afn&city=humphreys",
    logo: afnLogo,
  },
];

export const ALL_STATIONS = [
  ...KBS_STATIONS,
  ...MBC_STATIONS,
  ...SBS_STATIONS,
  ...EBS_STATIONS,
  ...LOCAL_STATIONS,
  ...YTN_STATIONS,
  ...TBS_STATIONS,
  ...TBN_STATIONS,
  ...CBS_STATIONS,
  ...RELIGIOUS_STATIONS,
  ...SPECIAL_STATIONS,
];
