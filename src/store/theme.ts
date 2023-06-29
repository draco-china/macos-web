/*
 * @Module: module.name
 * @Description: your description
 * @Author: draco
 * @Email: draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2023-06-29 13:23:24
 * @LastEditTime: 2023-06-29 13:23:24
 */
import dark from '@/assets/wallpapers/ventura/dark.webp';
import light from '@/assets/wallpapers/ventura/light.webp';
import { useEffect } from 'react';
import { proxy, useSnapshot } from 'valtio';

export interface IStore {
  mode: 'system' | 'light' | 'dark';
  theme: string;
  background: {
    light: string;
    dark: string;
  };
}

export const store = proxy<IStore>({
  mode: 'system',
  theme: 'sky',
  background: { dark, light },
});

function getMode() {
  if (store.mode === 'system') {
    const matches = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return matches ? 'dark' : 'light';
  }
  return store.mode as 'light' | 'dark';
}

function preLoadImage(url: string) {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${url})`;
  };
}

export const actions = {
  getMode,
  setMode(newMode: 'system' | 'light' | 'dark') {
    store.mode = newMode;
    const html = document.querySelector('html');
    html?.setAttribute('data-mode', getMode());
  },
  setTheme(newTheme: string) {
    store.theme = newTheme;
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', newTheme);
  },
  setBackground(newBackground: { light: string; dark: string }) {
    store.background = newBackground;
    preLoadImage(newBackground[getMode()]);
  },
};

export const useTheme = () => {
  const { mode, theme, background } = useSnapshot(store);

  useEffect(() => {
    actions.setMode(mode);
    actions.setTheme(theme);
    actions.setBackground(background);
  }, []);

  return { mode, theme, background: background[getMode()], actions };
};
