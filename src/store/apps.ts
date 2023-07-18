import type { ReactNode } from 'react';
import { proxy, useSnapshot } from 'valtio';

export interface App {
  id: string;
  name: string;
  icon: string;
  iframe?: string;
  url?: string;
  children?: ReactNode;
  dock?: boolean;
}

interface IStore {
  apps: App[];
}

export const store = proxy<IStore>({
  apps: [
    {
      id: 'launchpad',
      name: 'Launchpad',
      icon: 'https://img.icons8.com/?size=512&id=69463&format=png&color=1A6DFF,C822FF',
      dock: true,
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'https://img.icons8.com/?size=512&id=52539&format=png&color=1A6DFF,C822FF',
      url: 'https://github.com/draco-china/macos-web',
      dock: true,
    },
    {
      id: 'vscode',
      name: 'VS Code',
      icon: 'https://img.icons8.com/?size=512&id=i19Ns28h30P4&format=png&color=1A6DFF,C822FF',
      iframe: 'https://github1s.com/draco-china/macos-web',
      dock: true,
    },
    {
      id: 'app-store',
      name: 'App Store',
      icon: 'https://img.icons8.com/?size=512&id=V7EeO9rdpHrj&format=png&color=1A6DFF,C822FF',
      children: true,
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: 'https://img.icons8.com/?size=512&id=zxUWtopU6XdM&format=png&color=1A6DFF,C822FF',
      children: true,
    },
    {
      id: 'poe',
      name: 'Poe',
      icon: 'https://img.icons8.com/?size=512&id=kTuxVYRKeKEY&format=png&color=1A6DFF,C822FF',
      url: 'https://www.poe.com',
    },
    {
      id: 'gmail',
      name: 'Gmail',
      icon: 'https://img.icons8.com/?size=512&id=48165&format=png&color=1A6DFF,C822FF',
      url: 'https://mail.google.com',
    },
    {
      id: 'microsoft-365',
      name: 'Microsoft 365',
      icon: 'https://img.icons8.com/?size=512&id=wUAGUBXx2syB&format=png&color=1A6DFF,C822FF',
      url: 'https://www.office.com',
    },
  ],
});

const actions = {
  get: (id: string) => {
    return store.apps.find((app) => app.id === id);
  },
  add: (app: App) => {
    if (store.apps.find((item) => item.id === app.id)) return;
    store.apps.push(app);
  },
  remove: (id: string) => {
    const index = store.apps.findIndex((app) => app.id === id);
    if (index !== -1) store.apps.splice(index, 1);
  },
  update: (id: string, partialApp: Partial<App>) => {
    const app = store.apps.find((app) => app.id === id);
    if (app) Object.assign(app, partialApp);
  },
};

export const useApps = () => {
  const { apps } = useSnapshot(store);
  return {
    apps,
    actions,
  };
};

export const useApp = (id: string) => {
  const app = useSnapshot(store.apps).find((app) => app.id === id) as App;

  return {
    app,
    actions: {
      get: () => actions.get(id),
      update: (partialApp: Partial<App>) => actions.update(id, partialApp),
      remove: () => actions.remove(id),
    },
  };
};
