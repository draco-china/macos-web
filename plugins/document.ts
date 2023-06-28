/*
 * @Module: module.name
 * @Description: your description
 * @Author: draco
 * @Email: draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2023-06-27 12:59:20
 * @LastEditTime: 2023-06-27 12:59:20
 */
import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    // const mountElementId = api.userConfig.mountElementId || 'root';
    // $(`#${mountElementId}`).remove();
    // $('body').prepend(`<main id="${mountElementId}"></main>`);
    return $;
  });
  // api.addHTMLMetas(() => [{ name: 'foo', content: 'bar' }]);
  // api.addHTMLLinks(() => [{ rel: 'foo', content: 'bar' }]);
  // api.addHTMLStyles(() => [`body { color: red; }`]);
  // api.addHTMLHeadScripts(() => [`console.log('hello world from head')`]);
  // api.addHTMLScripts(() => [`console.log('hello world')`]);
  // api.addEntryCodeAhead(() => [`console.log('entry code ahead')`]);
  // api.addEntryCode(() => [`console.log('entry code')`]);
  // api.onDevCompileDone((opts) => {
  //   opts;
  //   // console.log('> onDevCompileDone', opts.isFirstCompile);
  // });
  // api.onBuildComplete((opts) => {
  //   opts;
  //   // console.log('> onBuildComplete', opts.isFirstCompile);
  // });
  // api.chainWebpack((memo) => {
  //   memo;
  // });
  // api.onStart(() => {});
  // api.onCheckCode((args) => {
  //   args;
  //   // console.log('> onCheckCode', args);
  // });
};
