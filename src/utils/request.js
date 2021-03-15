/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
// import axios from 'axios';
import {
  extend
} from 'umi-request';
import {
  notification,
  Message
} from 'antd';


// 定义错误请求程序    请求发生错误 请求之前
const errorHandler = (error) => {
    const {
      response
    } = error;
  
    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const {
        status,
        url
      } = response;
  
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    } else if (!response) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
  
    return response;
  };

  /** 配置request请求时的默认参数 */

const request = extend({
    errorHandler,
    // 默认错误处理
    credentials: 'include', // 默认请求是否带上cookie
  });
  
  export default request;