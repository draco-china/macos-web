import { defineConfig } from 'umi';
import icons from './icons';

export default defineConfig({
  mountElementId: 'app',
  routes: [{ path: '/', component: 'index' }],
  npmClient: 'pnpm',
  tailwindcss: {},
  reactQuery: {},
  icons,
  plugins: [
    '@umijs/plugins/dist/tailwindcss',
    '@umijs/plugins/dist/react-query',
    require.resolve('../plugins/document'),
  ],
  ignoreMomentLocale: true,
  fastRefresh: true,
  hash: true,
  codeSplitting: { jsStrategy: 'granularChunks' },
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
});
