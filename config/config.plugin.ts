import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: './',
  history: { type: 'hash' },
  outputPath: 'build/chrome-mv3-prod',
});
