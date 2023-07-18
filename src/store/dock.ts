import { proxy, useSnapshot } from 'valtio';

export interface IStore {
  apps: string[];
  size: number;
}

export const store = proxy<IStore>({
  apps: ['poe', 'gmail', 'microsoft-365', 'app-store', 'settings'],
  size: 5.6,
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
  setSize: (newSize: number) => {
    store.size = newSize;
  },
};

export const useDock = () => {
  const { apps, size } = useSnapshot(store);
  return { apps, size, actions };
};
