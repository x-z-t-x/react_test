import request from '@/utils/request';

// 模拟登陆 
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
// 拿到模拟的验证码  传入验证码  然后请求
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}



