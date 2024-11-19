"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
// 환경변수 로드 확인
console.log("Preload script environment variables:", process.env);
// 환경변수가 undefined인 경우를 대비한 기본값 설정
var electronAPI = {
    env: {
        API_URL: process.env.API_URL || "https://radio.ztqckg569b.workers.dev",
        // 다른 환경변수들도 여기에 추가
        NODE_ENV: process.env.NODE_ENV || "development",
    },
};
// API 노출 전에 값 확인
console.log("Exposing to renderer:", electronAPI);
electron_1.contextBridge.exposeInMainWorld("electron", electronAPI);
