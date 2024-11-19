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
import * as fs from "fs";

dotenv.config();

app.name = "Moradio";
app.setName("Moradio");

const isDev = process.env.NODE_ENV === "development";
const isWindows = process.platform === "win32";
let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuitting = false;
let trayCreated = false;

function getAssetPath(asset: string): string {
  let iconPath = "";

  if (isDev) {
    iconPath = path.join(__dirname, `../assets/${asset}`);
  } else {
    // Windows에서 asar 패키징된 경우 처리
    iconPath = isWindows
      ? path
          .join(process.resourcesPath, "assets", asset)
          .replace("app.asar", "app.asar.unpacked")
      : path.join(process.resourcesPath, "assets", asset);
  }

  // 파일 존재 여부 확인 및 로깅
  if (!fs.existsSync(iconPath)) {
    console.error(`Asset not found at path: ${iconPath}`);
    console.log("Current directory:", __dirname);
    console.log("Resource path:", process.resourcesPath);
    return "";
  }

  console.log(`Asset found at: ${iconPath}`);
  return iconPath;
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    minWidth: 320,
    minHeight: 480,
    // Windows에서는 메뉴바 없이 생성
    autoHideMenuBar: isWindows,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: `${__dirname}/preload.js`,
    },
    icon: getAssetPath("icons/icon_128x128@2x.png"),
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

  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${__dirname}/../build/index.html`
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

function createTray() {
  if (!isWindows || trayCreated) return;

  const iconPath = getAssetPath("icons/windows/icon_sm.ico");
  console.log("Trying to create tray with icon:", iconPath);

  try {
    if (!fs.existsSync(iconPath)) {
      console.error(`Tray icon not found at: ${iconPath}`);
      return;
    }

    setTimeout(() => {
      try {
        tray = new Tray(iconPath);
        trayCreated = true;

        const contextMenu = Menu.buildFromTemplate([
          {
            label: "창 열기/숨기기",
            click: () => {
              if (mainWindow?.isVisible()) {
                mainWindow.hide();
              } else {
                mainWindow?.show();
                mainWindow?.focus();
              }
            },
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
          if (mainWindow?.isVisible()) {
            mainWindow.hide();
          } else {
            mainWindow?.show();
            mainWindow?.focus();
          }
        });

        console.log("Tray created successfully");
      } catch (error) {
        console.error("Delayed tray creation failed:", error);
      }
    }, 1000);
  } catch (error) {
    console.error("Failed to create tray:", error);
  }
}

app.setAboutPanelOptions({
  applicationName: "Moradio",
  applicationVersion: app.getVersion(),
  copyright: "Copyright © 2024 Jihun Kim",
  credits: "모두 모아둔 모두의 라디오, Moradio",
});

app.whenReady().then(() => {
  createWindow();
});

// Dock 아이콘 클릭 또는 앱 재실행 시
app.on("activate", () => {
  // 창이 닫혀있으면 다시 표시
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    mainWindow?.show();
  }
});

// 앱 종료 전 정리
app.on("before-quit", () => {
  isQuitting = true;
});
