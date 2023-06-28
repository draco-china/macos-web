import { Button } from '@/components';
import { useEffect, useState } from 'react';
import { Icon } from 'umi';
import Spotlight from './spotlight';

function getClock() {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
  })
    .format(date)
    .replace(/\,/g, '');

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date);

  return `${formattedDate} ${formattedTime}`;
}

function TopBar() {
  const [clock, setClock] = useState<string>(getClock());

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(getClock());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-6 w-full items-center bg-background/30 text-sm font-medium text-foreground">
      <Button variant="ghost" className="h-full rounded-md">
        <Icon icon="apple" className="text-lg" />
      </Button>
      <span className="flex-auto" />
      <Spotlight />
      <Button variant="ghost" className="h-full rounded-md">
        {clock}
      </Button>
    </header>
  );
}

export default TopBar;
