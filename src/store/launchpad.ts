import { useEffect } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { useApps } from './apps';

export interface IStore {
  apps: string[];
}

export const store = proxy<IStore>({
  apps: [],
});

const actions = {
  add: (id: string) => {
    if (!store.apps.includes(id)) {
      store.apps.push(id);
    }
  },
  remove: (id: string) => {
    const index = store.apps.indexOf(id);
    if (index > -1) {
      store.apps.splice(index, 1);
    }
  },
  move: (from: number, to: number) => {
    if (from === to) return;
    const app = store.apps[from];
    store.apps.splice(from, 1);
    store.apps.splice(to, 0, app);
  },
  set: (apps: string[]) => {
    store.apps = apps;
  },
};

export const useLaunchpad = () => {
  const { apps: launchpads } = useSnapshot(store);
  const { apps } = useApps();
  useEffect(() => {
    store.apps = apps.filter((app) => !app.dock).map((app) => app.id);
  }, [apps]);
  return { apps: launchpads, actions };
};
