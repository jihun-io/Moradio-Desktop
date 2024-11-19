import {
  app,
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
  shell,
} from "electron";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

app.name = "Moradio";
app.setName("Moradio");

const isDev = process.env.NODE_ENV === "development";

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    minWidth: 320,
    minHeight: 480,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // 컴파일된 JS 파일 사용
    },
    icon: path.join(__dirname, "/assets/icons/icon_128x128@2x.png"),
  });

  const template: MenuItemConstructorOptions[] = [
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
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // 개발 모드에서는 개발 서버의 주소를 로드
  if (isDev) {
    win.loadURL("http://localhost:3000");
    // 개발자 도구 열기
    win.webContents.openDevTools();
  } else {
    // 프로덕션 모드에서는 빌드된 파일을 로드
    win.loadFile(path.join(__dirname, "../build/index.html"));
  }
}

app.setAboutPanelOptions({
  applicationName: "Moradio",
  applicationVersion: app.getVersion(),
  copyright: "Copyright © 2024 Jihun Kim",
  credits: "모두를 위한 모두의 라디오, Moradio",
});

// Electron이 준비되면 창을 생성
app.whenReady().then(createWindow);

// 모든 창이 닫히면 앱 종료 (macOS 제외)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
