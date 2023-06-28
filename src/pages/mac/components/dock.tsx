import { Separator } from '@/components';
import { useDock } from '@/store';
import { useMotionValue } from 'framer-motion';
import { ReactSortable } from 'react-sortablejs';
import DockItem from './dock-item';

interface DockProps {
  size: number;
}

export default function Dock({ size }: DockProps) {
  const { apps, actions } = useDock();
  const mouseX = useMotionValue<number | null>(null);

  const handleMouseMove = (event: React.MouseEvent<any, MouseEvent>) => {
    mouseX.set(event.nativeEvent.x);
  };
  const handleMouseLeave = () => {
    mouseX.set(null);
  };

  return (
    <footer
      className="fixed bottom-0 left-1/2 mb-2 flex -translate-x-1/2 justify-center space-x-2 rounded-3xl bg-background/60 px-3 py-1 shadow-md"
      style={{
        height: `${size}rem`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ReactSortable
        group={{
          name: 'dock-before',
          put: false,
          pull: false,
        }}
        list={['launchpad'].map((id: string) => ({ id }))}
        setList={(
          newState: {
            id: string;
            chosen?: boolean;
          }[],
        ) => {}}
        ghostClass="invisible"
        animation={150}
        delay={2}
        tag="ul"
        className="flex h-full w-max items-end justify-start space-x-2"
      >
        {['launchpad'].map((app) => (
          <DockItem key={app} id={app} mouseX={mouseX} size={size} />
        ))}
      </ReactSortable>
      <Separator orientation="vertical" className="bg-opacity-20" />
      <ReactSortable
        group={{
          name: 'dock',
          put: true,
          pull: false,
        }}
        list={apps.map((id) => ({ id }))}
        setList={(
          newState: {
            id: string;
            chosen?: boolean;
          }[],
        ) => {
          const over = newState.find((item) => item.chosen === false);
          if (over) {
            const overIndex = newState.findIndex(
              (item) => item.id === over.id && item.chosen === false,
            );
            const fromIndex = newState.findIndex(
              (item) => item.id === over.id && item.chosen !== false,
            );
            if (fromIndex !== -1) {
              newState.splice(overIndex, 0, newState.splice(fromIndex, 1)[0]);
            }
          }
          actions.set(Array.from(new Set(newState.map((item) => item.id))));
        }}
        ghostClass="invisible"
        animation={150}
        delay={2}
        tag="ul"
        className="flex h-full w-max items-end justify-start space-x-2"
      >
        {apps.map((app: string) => (
          <DockItem key={app} id={app} mouseX={mouseX} size={size} />
        ))}
      </ReactSortable>
      <Separator orientation="vertical" className="bg-opacity-20" />
      <ReactSortable
        group={{
          name: 'dock-after',
          put: false,
          pull: false,
        }}
        list={['github'].map((id: string) => ({ id }))}
        setList={(
          newState: {
            id: string;
            chosen?: boolean;
          }[],
        ) => {}}
        ghostClass="invisible"
        animation={150}
        delay={2}
        tag="ul"
        className="flex h-full w-max items-end justify-start space-x-2"
      >
        {['github'].map((app) => (
          <DockItem key={app} id={app} mouseX={mouseX} size={size} />
        ))}
      </ReactSortable>
    </footer>
  );
}
