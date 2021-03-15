import { parse } from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

// 定义正则  是不是http
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
// 获取地址栏里的路径
export const isUrl = (path) => reg.test(path);
// 
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;
  // 是开发环境就
  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
// 查询页面    获取地址栏里面  问号后面的第一个参数
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
