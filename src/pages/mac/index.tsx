import { useDock, useTheme } from '@/store';
import { Fragment } from 'react';
import Dock from './components/dock';
import Spotlight from './components/spotlight';
import TopBar from './components/top-bar';

export default function Mac() {
  const { background } = useTheme();
  const { size } = useDock();
  return (
    <Fragment>
      <TopBar />
      <Dock size={size} />
    </Fragment>
  );
}
