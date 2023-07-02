import fetchJsonp from 'fetch-jsonp';
import { useQuery } from 'umi';

export default function useAutoComplete({
  engine,
  query,
}: {
  engine: string;
  query: string;
}) {
  const { data, isLoading, isError } = useQuery(
    [`${engine}AutoComplete`, query],
    () =>
      new Promise((resolve, reject) => {
        let url, parseData: (data: any) => any;
        const jsonp = ['http:', 'https:'].includes(window.location.protocol);
        switch (engine) {
          case 'Google':
            url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
              query,
            )}${jsonp ? '&jsonp=callback' : ''}`;
            parseData = (data) => data[1];
            break;
          case 'Baidu':
            url = `https://www.baidu.com/sugrec?prod=pc&wd=${encodeURIComponent(
              query,
            )}${jsonp ? '&cb=callback' : ''}`;
            parseData = (data) => data.g;
            break;
          case 'Bing':
            url = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(
              query,
            )}${jsonp ? '&JsonType=callback&JsonCallback=callback' : ''}`;
            parseData = (data) => data[1];
            break;
          case 'Yahoo':
            url = `https://sugg.search.yahoo.com/sg/ac/gossip_us_maestro?output=fxjsonp&command=${encodeURIComponent(
              query,
            )}${jsonp ? '&callback=callback' : ''}`;
            parseData = (data) =>
              data.gossip.results.map((result: { key: any }) => result.key);
            break;
          case 'Wikipedia':
            url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
              query,
            )}&limit=10&namespace=0&format=json${
              jsonp ? '&callback=callback' : ''
            }`;
            parseData = (data) => data[1];
            break;
          case 'Qwant':
            url = `https://api.qwant.com/api/suggest/?q=${encodeURIComponent(
              query,
            )}&client=opensearch${
              jsonp ? '&format=jsonp&callback=callback' : ''
            }`;
            parseData = (data) => data.data;
            break;
          default:
            reject(new Error(`Unsupported search engine: ${engine}`));
            return;
        }
        if (!jsonp) {
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              const autoCompleteData = parseData(data) as string[];
              resolve(autoCompleteData);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          fetchJsonp(url, { jsonpCallbackFunction: 'callback' })
            .then((response) => response.json())
            .then((data) => {
              const autoCompleteData = parseData(data) as string[];
              resolve(autoCompleteData);
            })
            .catch((err) => {
              reject(err);
            });
        }
      }),
  );

  return {
    isLoading,
    data: data as string[],
    isError,
  };
}

export const Engines = [
  {
    key: 'Bing',
    url: 'https://www.bing.com/search?q=',
    title: '必应',
    icon: 'local:bing',
  },
  {
    key: 'Google',
    url: 'https://www.google.com/search?q=',
    title: '谷歌',
    icon: 'local:google',
  },
  {
    key: 'Baidu',
    url: 'https://www.baidu.com/s?wd=',
    title: '百度',
    icon: 'local:baidu',
  },
  {
    key: 'Yahoo',
    url: 'https://search.yahoo.com/search?p=',
    title: '雅虎',
    icon: 'local:yahoo',
  },
  {
    key: 'Wikipedia',
    url: 'https://zh.wikipedia.org/wiki/Special:Search/',
    title: '维基百科',
    icon: 'local:wikipedia',
  },
  {
    key: 'Qwant',
    url: 'https://www.qwant.com/?q=',
    title: 'Qwant',
    icon: 'local:qwant',
  },
];
