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
      className="flex flex-col items-center justify-center"
      onClick={actions.open}
    >
      <motion.span
        data-label={app.name}
        className="relative hover:before:absolute hover:before:bottom-full hover:before:left-1/2 hover:before:mb-2 hover:before:w-max hover:before:-translate-x-1/2 hover:before:rounded-md hover:before:border hover:before:border-border/20 hover:before:bg-background/80 hover:before:px-4 hover:before:py-2 hover:before:content-[attr(data-label)]"
        whileTap={{ translateY: !open && !app.dock ? '-72%' : 0 }}
      >
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
