"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var dotenv = require("dotenv");
dotenv.config();
electron_1.app.name = "Moradio";
electron_1.app.setName("Moradio");
var isDev = process.env.NODE_ENV !== "production";
function createWindow() {
    // 브라우저 창 생성
    var win = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    });
    var template = [
        {
            label: "Moradio",
            submenu: [
                { role: "about", label: "Moradio 정보" },
                { type: "separator" },
                { role: "services", label: "서비스" },
                { type: "separator" },
                { role: "hide", label: "Moradio 숨기기" },
                { role: "hideOthers", label: "다른 창 숨기기" },
                { role: "unhide", label: "모두 보기" },
                { type: "separator" },
                { role: "quit", label: "Moradio 종료" },
            ]
        },
    ];
    var menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
    // 개발 모드에서는 개발 서버의 주소를 로드
    if (isDev) {
        win.loadURL("http://localhost:3000");
        // 개발자 도구 열기
        win.webContents.openDevTools();
    }
    else {
        // 프로덕션 모드에서는 빌드된 파일을 로드
        win.loadFile(path.join(__dirname, "../build/index.html"));
    }
}
electron_1.app.setAboutPanelOptions({
    applicationName: "Moradio",
    applicationVersion: electron_1.app.getVersion(),
    copyright: "Copyright © 2024 Jihun Kim",
    credits: "모두를 위한 모두의 라디오, Moradio"
});
// Electron이 준비되면 창을 생성
electron_1.app.whenReady().then(createWindow);
// 모든 창이 닫히면 앱 종료 (macOS 제외)
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
