import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  // experimental: {
  //   viewTransitions: true,
  // },
  output: 'server', // 添加这行来消除headers警告
  integrations: [
    tailwind(),
    react({
      experimentalDisableStreaming: true,
    }),
  ],
  i18n: {
    locales: ["es", "en", "zh"],
    defaultLocale: "en",
  }
});