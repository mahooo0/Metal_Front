import type { NextConfig } from "next";

import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
    SERVER_URL: process.env.SERVER_URL!,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config, { isServer, dir }) => {
    if (isServer) {
      // Создаем пустой файл default-stylesheet.css для jsdom
      try {
        const browserDir = join(dir, ".next", "browser");
        mkdirSync(browserDir, { recursive: true });
        const cssFile = join(browserDir, "default-stylesheet.css");
        writeFileSync(cssFile, "/* Empty stylesheet for jsdom */", "utf-8");
      } catch (error) {
        // Игнорируем ошибки создания файла
      }
    }
    return config;
  },
};

export default nextConfig;
