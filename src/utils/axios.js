import axios from 'axios';
import {
  extend
} from 'umi-request';
import {
  notification,
  Message
} from 'antd';

// 请求路径前缀
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'test') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://baidu.com/';
}

// 请求超时时间
axios.defaults.timeout = 10000;
// 重置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截  查看是否有请求头
axios.interceptors.request.use(
  config => {
    // 查看缓存token  查看是否携带
    return config;
  },
  error => {
    return errorHandler(error);
  })

// 返回拦截  查看是否请求成功  
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return errorHandler(error);
  }
);
// 封装get请求


function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}



// 封装post
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};




// 响应拦截
const responsebefore = response => {

}


// 把写好的方法注入到返回值原型中  
const response = extend({
  responsebefore,
})



// export default { get, post }
// export default get;
// export default post;
