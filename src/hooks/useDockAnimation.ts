import useRaf from '@rooks/use-raf';
import {
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { RefObject } from 'react';

const useDockAnimation = (
  mouseX: MotionValue<number | null>,
  ref: RefObject<HTMLImageElement | undefined>,
  size: number,
) => {
  const baseWidth = (size - 2) * 16;
  const distanceLimit = baseWidth * 6;
  const beyondTheDistanceLimit = distanceLimit + 1;
  const distanceInput = [
    -distanceLimit,
    -distanceLimit / 1.25,
    -distanceLimit / 2,
    0,
    distanceLimit / 2,
    distanceLimit / 1.25,
    distanceLimit,
  ];
  const widthOutput = [
    baseWidth,
    baseWidth * 1.1,
    baseWidth * 1.414,
    baseWidth * 2,
    baseWidth * 1.414,
    baseWidth * 1.1,
    baseWidth,
  ];

  const distance = useMotionValue(beyondTheDistanceLimit);
  const widthPX = useSpring(
    useTransform(distance, distanceInput, widthOutput),
    {
      stiffness: 1100,
      damping: 60,
    },
  );

  const width = useTransform(widthPX, (width) => `${width / 16}rem`);

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();

      const imgCenterX = rect.left + rect.width / 2;

      // difference between the x coordinate value of the mouse pointer
      // and the img center x coordinate value
      const distanceDelta = mouseXVal - imgCenterX;
      distance.set(distanceDelta);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  }, true);

  return { width };
};

export default useDockAnimation;
