/*
 * @Module: module.name
 * @Description: your description
 * @Author: draco
 * @Email: draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2023-06-26 15:13:33
 * @LastEditTime: 2023-06-27 12:45:09
 */
import useDeviceType from '@/hooks/useDeviceType';
import { Suspense, lazy } from 'react';

const createComponent = (path: string) => {
  return lazy(() => {
    return new Promise((resolve, reject) => {
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
