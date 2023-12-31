import {
  Button,
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandShortcut,
  ScrollArea,
  Separator,
} from '@/components';
import useAutoComplete, { Engines } from '@/hooks/useAutoComplete';
import { useWindows } from '@/store';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Icon } from 'umi';

export default function Spotlight() {
  const [open, setOpen] = useState<boolean>(false);
  const [engine, setEngine] = useState<Record<string, string>>(Engines[0]);
  const [query, setQuery] = useState('');

  const { data } = useAutoComplete({
    engine: 'Bing',
    query,
  });

  const handleSearch = (q: string) => {
    if (q.trim()) {
      window.open(`${engine.url}${q.trim()}`, '_blank');
      setQuery('');
    }
  };

  useEffect(() => {
    setOpen(true);
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const { opens, minimizeds } = useWindows();

  useEffect(() => {
    const disabled = opens.filter((id) => !minimizeds.includes(id)).length > 0;
    setOpen(!disabled);
  }, [opens, minimizeds]);

  return (
    <>
      <Button
        variant="ghost"
        className="h-full rounded-md"
        onClick={() => setOpen(!open)}
      >
        <Search className="h-4 w-4" />
      </Button>
      <Command
        className={`fixed bottom-0 left-0 right-0 top-0 m-auto h-max w-2/5 origin-center rounded-lg border border-opacity-20 bg-opacity-60 shadow-md transition-all duration-200 delay-75 ${
          open
            ? 'visible z-10 scale-100 opacity-100'
            : 'invisible z-0 scale-0 opacity-0'
        }`}
        shouldFilter={false}
        loop={false}
      >
        <CommandInput
          value={query}
          onValueChange={setQuery}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(query);
          }}
          placeholder="Spotlight Search"
          className="h-12 text-lg"
        />
        <div className="flex justify-between border-b border-border/20">
          <CommandGroup heading="应用" className="w-40">
            {Engines.map((item) => (
              <CommandItem
                key={item.key}
                value={item.key}
                className={`cursor-pointer ${
                  item.key === engine.key
                    ? 'bg-accent text-accent-foreground'
                    : ''
                }`}
                disabled
              >
                <div
                  className="flex h-full w-full items-center"
                  onClick={() => {
                    setEngine(item);
                  }}
                >
                  <Icon icon={item.icon as any} className="mr-4 text-lg" />
                  {item.title}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={engine.title} className="flex-auto border-l">
            <ScrollArea className="h-72">
              {data?.map((item: string) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(item) => {
                    handleSearch(item);
                  }}
                  className="cursor-pointer"
                >
                  {item}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </div>
        <CommandItem disabled>
          Command
          <CommandShortcut className="flex h-4 items-center space-x-2">
            <span className="flex items-center">
              ⌃<Icon icon="windows" className="mx-1 text-sm" />K
            </span>
            <Separator orientation="vertical" className="bg-opacity-20" />
            <span>⌘ K</span>
          </CommandShortcut>
        </CommandItem>
      </Command>
    </>
  );
}
