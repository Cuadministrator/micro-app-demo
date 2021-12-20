import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IApiResponse } from '../../typings/global'

/**
 * 将接口返回的字段格式化到标准的 IApiResponse
 * @param res obj 原始的res格式
 */
function formatAjaxResponse<T> (res: any): IApiResponse<T> {
  if (!res) {
    return {
      code: 2,
      data: null,
      msg: ''
    }
  }

  if (typeof res !== 'object') {
    return {
      code: 2,
      data: null,
      msg: ''
    }
  }

  const {
    code = 0,
    data = null,
    msg = '',
    message = '',
    resultMessage = '',
    totalCount,
    pageIndex,
    pageSize
  } = res

  return {
    code,
    data,
    msg: msg || message || resultMessage || '',
    totalCount,
    pageIndex,
    pageSize
  }
}

const domain = '//uat-activity.aihuishou.com'
const baseURLErp = domain  || ''

function createDubaiAxiosInstance (
  baseURL: string, formatResponse: <T>(res: any) => IApiResponse<T>
): <T>(config: AxiosRequestConfig) => Promise<IApiResponse<T>> {
  const erpAxiosInstance = axios.create({
    baseURL: baseURLErp,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  return <T = any> (config: AxiosRequestConfig): Promise<IApiResponse<T>> => {
    config.headers = {
      ...(config.headers || {}),
    }

    return erpAxiosInstance(config).then(
      (res: AxiosResponse): IApiResponse<T> => {
        if (res.status === 200) {
          if (res.data.code === 401) {
            const { redirectUrl, appRedirectParameter } = res.data.data
            window.location.href = redirectUrl + `${encodeURIComponent(
              `?${appRedirectParameter}=${encodeURIComponent(window.location.href)}`,
            )}`
          }
          return formatResponse<T>(res.data)
        } else {
          return {
            code: 1,
            data: null,
            msg: '网络错误'
          }
        }
      },
      (): IApiResponse<T> => {
        return {
          code: 1,
          data: null,
          msg: '网络错误'
        }
      }
    )
  }
}

export default createDubaiAxiosInstance(baseURLErp, formatAjaxResponse)
