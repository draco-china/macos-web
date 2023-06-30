import useDeviceType from '@/hooks/useDeviceType';
import { Suspense, lazy } from 'react';

const createComponent = (path: string) => {
  return lazy(() => {
    return new Promise((resolve) => {
      import(`${path}`).then((module) => resolve(module));
    });
  });
};

export default function () {
  const type = useDeviceType();
  let Module;
  switch (type) {
    case 'pc':
      Module = createComponent('./mac');
      break;
    case 'ipad':
      Module = createComponent('./ipad');
      break;
    case 'mobile':
      Module = createComponent('./ios');
      break;
  }
  return (
    <>
      <Suspense>
        <Module />
      </Suspense>
    </>
  );
}
