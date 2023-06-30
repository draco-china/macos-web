import { defineConfig } from 'umi';
import icons from './icons';

export default defineConfig({
  title: 'macos',
  favicons: ['/favicon/icon.png'],
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
  esbuildMinifyIIFE: true,
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  verifyCommit: {
    scope: [
      'feat',
      'fix',
      'docs',
      'style',
      'refactor',
      'perf',
      'test',
      'workflow',
      'build',
      'ci',
      'chore',
      'types',
      'wip',
      'release',
      'dep',
      'deps',
      'example',
      'examples',
      'merge',
      'revert',
    ],
    allowEmoji: true,
  },
});
