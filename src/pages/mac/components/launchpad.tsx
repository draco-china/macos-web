import { useApp, useLaunchpad, useWindow } from '@/store';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

interface LaunchpadProps {
  size: number;
  background: string;
}

function Item({ id }: { id: string }) {
  const { app } = useApp(id);
  const { actions } = useWindow(id);

  return (
    <li className="flex  justify-center active:opacity-60">
      <div className="flex flex-col items-center justify-center">
        <img
          className="W-16 h-16 cursor-pointer rounded-2xl bg-foreground"
          draggable={false}
          src={app?.icon}
          onClick={() => {
            if (app.url) {
              window.open(app.url, '_blank');
            } else {
              actions.open();
            }
          }}
        />
        <span className="w-max whitespace-normal pt-2 text-base text-foreground">
          {app.name}
        </span>
      </div>
    </li>
  );
}

function Launchpad({ size, background }: LaunchpadProps) {
  const { apps, actions } = useLaunchpad();
  const { open } = useWindow('launchpad');

  const [query, setQuery] = useState('');
  if (!open) return null;
  return (
    <>
      <div
        className="fixed top-0 z-10 h-screen w-screen overflow-hidden"
        style={{ backgroundImage: `url(${background})` }}
      >
        <img src={background} className="blur-2xl" />
      </div>
      <motion.section
        className="fixed z-20 flex h-screen w-screen flex-col items-center"
        style={{ height: `calc(100vh - ${size}rem)` }}
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{
          duration: 0.8,
          type: 'spring',
        }}
      >
        <div className="mb-12 mt-6 flex h-max w-max items-center justify-center rounded-lg border-foreground/30 bg-background/50 p-1 text-foreground">
          <Search className="mx-2 h-4 w-4" />
          <input
            className=" h-6 w-48 flex-auto rounded-lg  bg-transparent shadow-md outline-0 ring-0"
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ReactSortable
          group={{
            name: 'launchpad',
            pull: 'clone',
            put: false,
          }}
          list={apps.map((id) => ({ id }))}
          setList={(newState) => {
            actions.set(newState.map((item) => item.id));
          }}
          ghostClass="invisible"
          animation={150}
          delay={2}
          tag="ul"
          className="grid w-full max-w-7xl grid-cols-7 gap-x-[10px] gap-y-[36px] p-[20px]"
        >
          {apps
            .filter(
              (item) =>
                item.toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) >
                -1,
            )
            .map((id) => (
              <Item key={id} id={id} />
            ))}
        </ReactSortable>
      </motion.section>
    </>
  );
}

export default Launchpad;
