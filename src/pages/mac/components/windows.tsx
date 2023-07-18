import { Button, ScrollArea } from '@/components';
import { cn } from '@/lib/utils';
import { useApp, useWindow, useWindows } from '@/store';
import { useSize } from 'ahooks';
import { Suspense, lazy, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Icon } from 'umi';

const createComponent = (path: string) => {
  return lazy(() => {
    return new Promise((resolve) => {
      import(`${path}`).then((module) => resolve(module));
    });
  });
};

function Window({ id }: { id: string }) {
  const { app } = useApp(id);
  const { maximized, minimized, zIndex, actived, actions } = useWindow(id);
  const { width: winWidth = 0, height: winHeight = 0 } = useSize(
    document.body,
  )!;
  const [size, setSize] = useState({ width: 520, height: 300 * 1.414 });
  const [position, setPosition] = useState({
    x: (winWidth * 2 - 520) / 2,
    y: (winHeight - 300 * 1.414) / 2,
  });

  let children = (
    <div className="m-auto flex h-full flex-col items-center justify-center text-center text-3xl text-foreground">
      <img src={app.icon} alt={app.name} className="h-48 w-48" />
      <span> {app.name} 开发中</span>
    </div>
  );
  if (app.iframe) {
    children = (
      <iframe
        src={app.iframe}
        className="border-none"
        style={{
          width: maximized ? winWidth : size.width,
          height: (maximized ? winHeight : size.height) - 32,
        }}
        title={app.name}
      />
    );
  }
  if (app.children && app.id !== 'settings') {
    let Module: any;
    switch (app.id) {
      case 'app-store':
        Module = createComponent('./app-store');
        break;
      case 'settings':
        Module = createComponent('./settings');
        break;
      default:
        break;
    }
    children = (
      <Suspense>
        <Module />
      </Suspense>
    );
  }

  return (
    <Rnd
      className={cn(
        'overflow-hidden rounded-lg border border-gray-500/30 bg-background shadow-md',
        maximized && 'rounded-none border-none',
        minimized && 'h-0 w-0 opacity-0',
      )}
      size={{
        width: maximized ? winWidth : size.width,
        height: maximized ? winHeight : size.height,
      }}
      position={{
        x: maximized ? winWidth / 2 : position.x,
        y: maximized ? -24 : position.y,
      }}
      style={{ zIndex }}
      bounds="parent"
      minWidth="300"
      minHeight="300"
      dragHandleClassName="window-header"
      disableDragging={maximized}
      onClick={actions.active}
      onDrag={(e, d) => {
        if (maximized) return;
        actions.active();
        // TopBar height
        if (d.y < 1.4 * 16) {
          setPosition({ x: d.x, y: 1.4 * 16 });
        }
      }}
      onDragStop={(e, d) => {
        if (maximized) return;
        setPosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        setPosition({ x: position.x, y: position.y });
      }}
    >
      <header className="window-header relative flex h-8 w-full items-center justify-center active:cursor-move">
        <h1 className="select-none text-foreground">{app.name}</h1>
        <div className="group absolute left-0 top-0 flex w-max items-center space-x-2 p-2">
          <Button
            size="icon"
            className={cn(
              'h-4 w-4 rounded-full bg-foreground/40 hover:bg-red-400',
              actived && 'bg-red-500',
            )}
            onClick={(e) => {
              e.stopPropagation();
              actions.close();
            }}
          >
            <Icon
              icon="close"
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Button>
          <Button
            size="icon"
            className={cn(
              'h-4 w-4 rounded-full bg-foreground/30 hover:bg-yellow-400',
              actived && 'bg-yellow-500 ',
              maximized && 'bg-foreground/30 hover:bg-foreground/30',
            )}
            onClick={(e) => {
              e.stopPropagation();
              actions.minimize();
            }}
          >
            <Icon
              icon="minus"
              className={cn(
                'opacity-0 transition-opacity group-hover:opacity-100',
                maximized && 'opacity-0 group-hover:opacity-0 ',
              )}
            />
          </Button>
          <Button
            size="icon"
            className={cn(
              'h-4 w-4 rounded-full bg-foreground/30 hover:bg-green-400',
              actived && 'bg-green-500 ',
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (maximized) {
                actions.unmaximize();
              } else {
                actions.maximize();
              }
            }}
          >
            <Icon
              icon={maximized ? 'exit-full' : 'full'}
              className="opacity-0 transition-opacity  group-hover:opacity-100"
            />
          </Button>
        </div>
      </header>
      <Suspense>
        <ScrollArea
          style={{
            left: -1,
            width: maximized ? winWidth : size.width,
            height: (maximized ? winHeight : size.height) - 32,
          }}
        >
          {children}
        </ScrollArea>
      </Suspense>
    </Rnd>
  );
}

function Windows() {
  const { opens, maximizeds, minimizeds } = useWindows();
  const maximized =
    maximizeds.filter((id) => !minimizeds.includes(id)).length > 0;
  return (
    <section
      className="fixed left-[-50vw] block h-[200vh] w-[200vw] justify-self-center"
      style={{
        zIndex: maximized ? 20 : 0,
      }}
    >
      <Suspense fallback={<span></span>}>
        {opens
          .filter((app) => !['launchpad', 'github'].includes(app))
          .map((app) => (
            <Window key={app} id={app} />
          ))}
      </Suspense>
    </section>
  );
}

export default Windows;
