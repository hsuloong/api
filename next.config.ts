import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/v2ray/client/v2rayNG-android-arm.apk',
        destination: 'https://v2rayng.2dust.link/v2rayNG_1.10.4_arm64-v8a.apk',
      },
      {
        source: '/v2ray/client/v2rayN-windows.zip',
        destination: 'https://v2rayn.2dust.link/v2rayN-windows-64-SelfContained.zip',
      },
      {
        source: '/v2ray/client/v2rayN-linux.zip',
        destination: 'https://v2rayn.2dust.link/v2rayN-linux-64.zip',
      },
      {
        source: '/v2ray/client/v2rayN-macos-intel.dmg',
        destination: 'https://v2rayn.2dust.link/v2rayN-macos-64.dmg',
      },
      {
        source: '/v2ray/client/v2rayN-macos-arm.dmg',
        destination: 'https://v2rayn.2dust.link/v2rayN-macos-arm64.dmg',
      },
    ]
  }
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
