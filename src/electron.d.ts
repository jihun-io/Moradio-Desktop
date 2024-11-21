export interface IElectronAPI {
  env: {
    API_URL: string;
    [key: string]: string | undefined;
  };
  send: (channel: string, data: any) => void;
  receive: (channel: string, func: Function) => void;
}

declare global {
  interface Window {
    electron: {
      env: {
        API_URL: string;
        [key: string]: any;
      };
    };
  }
}

export {};
