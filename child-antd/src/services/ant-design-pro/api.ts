// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

const baseUrl = '//uat-activity.aihuishou.com'

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<ResponseResult<API.CurrentUser | API.UnLoginResult>>(baseUrl + '/erp-gateway/get-login-user', {
    method: 'GET',
    credentials: 'include',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
// export async function outLogin(options?: { [key: string]: any }) {
//   return request<Record<string, any>>(baseUrl + '/api/login/outLogin', {
//     method: 'POST',
//     ...(options || {}),
//   });
// }
