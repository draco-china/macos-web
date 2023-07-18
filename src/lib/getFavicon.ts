export default function getFaviconUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 尝试从固定URL中获取favicon
    const fixedUrl = `${url}/favicon.ico`;
    const fixedImg = new Image();
    fixedImg.src = fixedUrl;
    fixedImg.onload = function () {
      resolve(fixedUrl);
    };
    fixedImg.onerror = function () {
      // 如果固定URL中没有找到favicon，则从HTML文档中查找
      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const linkTags = doc.querySelectorAll(
            'link[rel="icon"], link[rel="shortcut icon"]',
          );
          let faviconUrl: string | null = null;
          if (linkTags.length > 0) {
            faviconUrl = linkTags[0].getAttribute('href');
            if (faviconUrl && faviconUrl.startsWith('/')) {
              faviconUrl = `${url}${faviconUrl}`;
            }
          }
          if (faviconUrl) {
            resolve(faviconUrl);
          } else {
            reject('找不到网站favicon');
          }
        })
        .catch((error) => {
          reject(`获取HTML文档失败：${error}`);
        });
    };
  });
}
