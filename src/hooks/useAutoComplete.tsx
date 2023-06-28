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
        switch (engine) {
          case 'Google':
            url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
              query,
            )}&jsonp=callback`;
            parseData = (data) => data[1];
            break;
          case 'Baidu':
            url = `https://www.baidu.com/sugrec?prod=pc&wd=${encodeURIComponent(
              query,
            )}&cb=callback`;
            parseData = (data) => data.g;
            break;
          case 'Bing':
            url = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(
              query,
            )}&JsonType=callback&JsonCallback=callback`;
            parseData = (data) => data[1];
            break;
          case 'Yahoo':
            url = `https://sugg.search.yahoo.com/sg/ac/gossip_us_maestro?output=fxjsonp&command=${encodeURIComponent(
              query,
            )}&callback=callback`;
            parseData = (data) =>
              data.gossip.results.map((result: { key: any }) => result.key);
            break;
          case 'Wikipedia':
            url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
              query,
            )}&limit=10&namespace=0&format=json&callback=callback`;
            parseData = (data) => data[1];
            break;
          case 'Qwant':
            url = `https://api.qwant.com/api/suggest/?q=${encodeURIComponent(
              query,
            )}&client=opensearch&format=jsonp&callback=callback`;
            parseData = (data) => data.data;
            break;
          default:
            reject(new Error(`Unsupported search engine: ${engine}`));
            return;
        }
        fetchJsonp(url, { jsonpCallbackFunction: 'callback' })
          .then((response) => response.json())
          .then((data) => {
            const autoCompleteData = parseData(data) as string[];
            resolve(autoCompleteData);
          })
          .catch((err) => {
            reject(err);
          });
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
    icon: 'https://www.bing.com/favicon.ico',
  },
  {
    key: 'Google',
    url: 'https://www.google.com/search?q=',
    title: '谷歌',
    icon: 'https://www.google.com/favicon.ico',
  },
  {
    key: 'Baidu',
    url: 'https://www.baidu.com/s?wd=',
    title: '百度',
    icon: 'https://www.baidu.com/favicon.ico',
  },
  {
    key: 'Yahoo',
    url: 'https://search.yahoo.com/search?p=',
    title: '雅虎',
    icon: 'https://search.yahoo.com/favicon.ico',
  },
  {
    key: 'Wikipedia',
    url: 'https://zh.wikipedia.org/wiki/Special:Search/',
    title: '维基百科',
    icon: 'https://zh.wikipedia.org/static/favicon/wikipedia.ico',
  },
  {
    key: 'Qwant',
    url: 'https://www.qwant.com/?q=',
    title: 'Qwant',
    icon: 'https://www.qwant.com/favicon.ico',
  },
];
