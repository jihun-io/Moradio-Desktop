const { notarize } = require("@electron/notarize");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env.signing") });

exports.default = async function notarizing(context) {
  // 환경 변수 로깅으로 디버깅
  console.log("Notarization environment:", {
    hasAppleId: !!process.env.APPLE_ID,
    hasPassword: !!process.env.APPLE_ID_PASSWORD,
    hasTeamId: !!process.env.APPLE_TEAM_ID,
  });

  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== "darwin") {
    console.log("Skipping notarization: Not macOS");
    return;
  }

  // 필수 환경 변수 확인
  if (
    !process.env.APPLE_ID ||
    !process.env.APPLE_ID_PASSWORD ||
    !process.env.APPLE_TEAM_ID
  ) {
    console.log(
      "Skipping notarization: Missing required environment variables"
    );
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appPath = `${appOutDir}/${appName}.app`;

  console.log(`Notarizing ${appPath}`);

  try {
    await notarize({
      appPath,
      tool: "notarytool",
      appBundleId: "io.jihun.moradio.electron",
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID,
    });
    console.log("Notarization complete");
  } catch (error) {
    console.error("Notarization failed:", error);
    throw error;
  }
};
