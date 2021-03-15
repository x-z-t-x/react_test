// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  // 路由模式
  hash: true,
  
  antd: {},

  dva: {
    hmr: true,
  },
  // 历史记录  使用浏览器的
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  // 动态端口
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  // 目标
  targets: {
    ie: 11,
  },

  // umi routes: https://umijs.org/docs/routing
  // 路由
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  // 主题   主题颜色
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  // 区分环境     如果APP_ENV 没有值  就默认为dev  开发环境
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
