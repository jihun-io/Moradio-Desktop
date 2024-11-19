export interface IElectronAPI {
  env: {
    API_URL: string;
    // 다른 환경변수들도 여기에 추가
    [key: string]: string | undefined;
  };
  send: (channel: string, data: any) => void;
  receive: (channel: string, func: Function) => void;
  // 다른 preload에서 노출한 API들도 여기에 추가
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
