import useDockAnimation from '@/hooks/useDockAnimation';
import { useApp, useWindow } from '@/store';
import { MotionValue, motion } from 'framer-motion';
import { useRef } from 'react';

interface ItemProps {
  id: string;
  mouseX: MotionValue<number | null>;
  size: number;
}

export default function DockItem({ id, mouseX, size }: ItemProps) {
  const { app } = useApp(id);
  const { open, actions } = useWindow(id);

  const ref = useRef<HTMLImageElement>();

  const { width } = useDockAnimation(mouseX, ref, size);

  if (!app) return null;
  return (
    <li
      className="group flex flex-col items-center justify-center"
      onClick={actions.open}
    >
      <motion.span
        className="relative"
        whileTap={{ translateY: !open && !app.dock ? '-72%' : 0 }}
      >
        <span className="invisible absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-md border border-border/20 bg-background/80 px-4 py-2 group-hover:visible">
          {app.name}
        </span>
        <motion.img
          ref={ref as any}
          className="cursor-pointer rounded-2xl bg-foreground"
          draggable={false}
          src={app.icon}
          style={{ width, willChange: 'width' }}
        />
      </motion.span>
      <span
        className={`mt-2 h-1 w-1 rounded-full bg-foreground ${
          open || app.dock ? 'opacity-1' : 'opacity-0'
        }`}
      />
    </li>
  );
}
