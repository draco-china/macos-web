/*
 * @Module: module.name
 * @Description: your description
 * @Author: draco
 * @Email: draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2023-07-11 14:09:13
 * @LastEditTime: 2023-07-18 17:32:44
 */
import { useDock, useTheme } from '@/store';
import { Fragment } from 'react';
import Dock from './components/dock';
import Launchpad from './components/launchpad';
import TopBar from './components/top-bar';
import Windows from './components/windows';

export default function Mac() {
  const { background } = useTheme();
  const { size } = useDock();
  return (
    <Fragment>
      <TopBar />
      <Windows />
      <Launchpad size={size} background={background} />
      <Dock size={size} />
    </Fragment>
  );
}
