import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components';
import { useTheme } from '@/store';
import { Icon } from 'umi';

export const themeList = [
  {
    theme: 'red',
    name: '浪漫红',
  },
  {
    theme: 'orange',
    name: '活力橙',
  },
  {
    theme: 'amber',
    name: '日落黄',
  },
  {
    theme: 'yellow',
    name: '柠檬黄',
  },
  {
    theme: 'lime',
    name: '新生绿',
  },
  {
    theme: 'green',
    name: '仙野绿',
  },
  {
    theme: 'emerald',
    name: '翡翠绿',
  },
  {
    theme: 'teal',
    name: '水鸭青',
  },
  {
    theme: 'cyan',
    name: '碧涛青',
  },
  {
    theme: 'sky',
    name: '天空蓝',
  },
  {
    theme: 'blue',
    name: '海蔚蓝',
  },
  {
    theme: 'indigo',
    name: '靛蓝青',
  },
  {
    theme: 'violet',
    name: '罗兰紫',
  },
  {
    theme: 'purple',
    name: '暗夜紫',
  },
  {
    theme: 'fuchsia',
    name: '青春紫',
  },
  {
    theme: 'pink',
    name: '猛男粉',
  },
  {
    theme: 'rose',
    name: '玫瑰红',
  },
];

export default function ActionCenter() {
  const { mode, theme, actions } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-full">
          <Icon icon="action-center" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max bg-opacity-40 ">
        <div className="grid gap-2">
          <div className="rounded-lg border bg-background/60 p-2 shadow-md">
            <h4 className="py-2 font-medium leading-none">主题模式</h4>
            <div className="mt-2 grid grid-cols-5 gap-2 text-xl">
              {['system', 'light', 'dark'].map((item) => (
                <Button
                  key={item}
                  className={`h-12 w-12 rounded-lg  text-xl ${
                    mode !== item ? 'bg-foreground/20' : ''
                  }`}
                  size="icon"
                  variant={mode === item ? 'default' : 'ghost'}
                  onClick={() => {
                    actions.setMode(item as 'system' | 'light' | 'dark');
                  }}
                >
                  <Icon icon={item as 'system' | 'light' | 'dark'} />
                </Button>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-background/60 p-2 shadow-md">
            <h4 className="py-2 font-medium leading-none">主题颜色</h4>
            <div className="mt-2 grid grid-cols-5 gap-2 ">
              {themeList.map((item) => (
                <Button
                  aria-lable={item.name}
                  key={item.theme}
                  className="h-12 w-12 rounded-lg bg-foreground/20"
                  onClick={() => {
                    actions.setTheme(item.theme);
                  }}
                >
                  <Icon
                    icon="check"
                    className={`rounded-full p-1 text-base bg-${item.theme} ${
                      theme === item.theme
                        ? 'bg-foreground'
                        : 'text-transparent'
                    }`}
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
