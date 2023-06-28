import { proxy, useSnapshot } from 'valtio';

export interface IStore {
  opens: string[]; // 打开的应用 id 列表, 顺序即为 z-index
  maximizeds: string[]; // 最大化的应用 id 列表
  minimizeds: string[]; // 最小化的应用 id 列表
}

export const store = proxy<IStore>({
  opens: [],
  maximizeds: [],
  minimizeds: [],
});

export const useWindows = () => {
  const { opens, maximizeds, minimizeds } = useSnapshot(store);
  return { opens, maximizeds, minimizeds };
};

export const useWindow = (id: string) => {
  const { opens, maximizeds, minimizeds } = useSnapshot(store);
  const actions = {
    open: () => {
      if (!opens.includes(id)) {
        store.opens.push(id);
      }
      actions.unminimize();
      actions.active();
      if (opens.includes('launchpad')) {
        store.opens = store.opens.filter((id) => id !== 'launchpad');
      }
    },
    close: () => {
      const index = opens.indexOf(id);
      if (index > -1) {
        store.opens.splice(index, 1);
        actions.unmaximize();
        actions.unminimize();
      }
    },
    active: () => {
      const index = opens.indexOf(id);
      if (index > -1) {
        store.opens.splice(index, 1);
        store.opens.push(id);
      }
    },
    maximize: () => {
      if (!maximizeds.includes(id)) {
        store.maximizeds.push(id);
      }
    },
    unmaximize: () => {
      const index = maximizeds.indexOf(id);
      if (index > -1) {
        store.maximizeds.splice(index, 1);
      }
    },
    minimize: () => {
      if (!minimizeds.includes(id)) {
        store.minimizeds.push(id);
      }
    },
    unminimize: () => {
      const index = minimizeds.indexOf(id);
      if (index > -1) {
        store.minimizeds.splice(index, 1);
      }
    },
  };
  return {
    open: opens.includes(id),
    maximized: maximizeds.includes(id),
    minimized: minimizeds.includes(id),
    zIndex: opens.indexOf(id) + 1,
    actived: opens[opens.length - 1] === id,
    actions,
  };
};
