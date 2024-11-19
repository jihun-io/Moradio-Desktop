import {
  app,
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
  shell,
  Tray,
} from "electron";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

app.name = "Moradio";
app.setName("Moradio");

const isDev = process.env.NODE_ENV === "development";
const isWindows = process.platform === "win32";
let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuitting = false;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    minWidth: 320,
    minHeight: 480,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "../assets/icons/icon_128x128@2x.png"),
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
        {
          label: "Moradio 종료",
          click: () => {
            isQuitting = true;
            app.quit();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Windows에서만 트레이 아이콘 생성
  if (isWindows) {
    createTray();
    mainWindow.setMenu(null);
  }

  // 모든 플랫폼에서 창 닫기 버튼 클릭 시 숨기기
  mainWindow.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
      return false;
    }
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }
}

function createTray() {
  if (!isWindows) return;

  const iconPath = path.join(__dirname, "../assets/icons/icon_16x16@2x.png");
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "창 열기",
      click: () => mainWindow?.show(),
    },
    { type: "separator" },
    {
      label: "종료",
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip("Moradio");

  tray.on("double-click", () => {
    mainWindow?.show();
  });
}

app.setAboutPanelOptions({
  applicationName: "Moradio",
  applicationVersion: app.getVersion(),
  copyright: "Copyright © 2024 Jihun Kim",
  credits: "모두 모아둔 모두의 라디오, Moradio",
});

app.whenReady().then(createWindow);

// Dock 아이콘 클릭 또는 앱 재실행 시
app.on("activate", () => {
  // 창이 닫혀있으면 다시 표시
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    mainWindow?.show();
  }
});

// 모든 창이 닫혀도 앱 종료하지 않음
app.on("window-all-closed", () => {
  // Windows가 아닌 경우에도 앱을 종료하지 않음
  // if (process.platform !== "darwin") {
  //   app.quit();
  // }
});

// 앱 종료 전 정리
app.on("before-quit", () => {
  isQuitting = true;
});
