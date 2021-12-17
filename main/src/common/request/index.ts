import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Qs from 'qs'
import { ApiResponse } from '../../typings/global'

class ClientHttpError extends Error {
  code: string
  msg: string

  constructor (code: string, message: string) {
    super(message)
    this.code = code
    this.msg = message
  }
}

function postResponse<T extends ApiResponse<unknown>> (response: AxiosResponse<T>) {
  // 与后端约定
  if (response.data.code === 0 || response.data.code === 200) {
    const data = response.data
    data.originHeaders = response.headers
    return data
  }
  return Promise.reject(response.data)
}


function getErrorMsg (response: AxiosResponse): string {
  if (
    response.headers &&
    response.headers['content-type'] &&
    response.headers['content-type'].indexOf('text/') >= 0
  ) {
    const msg = response.data.replace(/<[\w\W]*?>/gi, '')
    return `${response.statusText}: ${msg}`
  }
  try {
    const obj =
      typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data
    return obj.resultMessage || '请求失败'
  } catch (e) {
    return '请求失败'
  }
}

class Http {
  instance: AxiosInstance
  constructor (instance: AxiosInstance) {
    this.instance = instance
    this.instance.interceptors
      .response
      .use((response) => {
        try {
          const obj =
            typeof response.data === 'string'
              ? JSON.parse(response.data)
              : response.data
          console.warn(response)
          if ('code' in response.data) {
            obj.code = Number(obj.code)
            if (!(obj.code === 0 || obj.code === 200)) {
              obj.msg = getErrorMsg(response)
            }
            return Promise.resolve(response)
          } else {
            response.data = {
              code: response.status,
              data: response.data,
            }
            return Promise.resolve(response)
          }
        } catch (e) {
          e.code = 500
          return Promise.resolve(response)
        }
      }, (error: AxiosError) => {
        if (!error.response) {
          return Promise.resolve({
            data: {
              code: 400,
              msg: '网络请求失败'
            },
            status: error.code,
            statusText: '网络请求失败',
            headers: {},
            config: error.config,
            request: error.request,
          })
        }
        if (error.response.headers['content-type'].indexOf('text/') >= 0) {
          error.response.data = {
            code: error.response.status,
            msg: getErrorMsg(error.response)
          }
        }
        if (!('code' in error.response.data)) {
          error.response.data.code = error.response.data.status || error.response.status
          error.response.data.msg = error.response.data.msg || error.response.data.message
        }
        return Promise.resolve(error.response)
      })
  }

  get<T> (url: string, config?: AxiosRequestConfig) {
    return this.instance
      .get<ApiResponse<T>>(url, {
        ...config,
        paramsSerializer: (params) => {
          return Qs.stringify(params, { arrayFormat: 'repeat' })
        },
      })
      .then(postResponse)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T> (url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance
      .post<ApiResponse<T>>(url, data, config)
      .then(postResponse)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T> (url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance
      .put<ApiResponse<T>>(url, data, config)
      .then(postResponse)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<T> (url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance
      .request<ApiResponse<T>>({
        ...config,
        method: 'DELETE',
        url,
        params: data,
        paramsSerializer: (params) => {
          return Qs.stringify(params, { arrayFormat: 'repeat' })
        },
      })
      .then(postResponse)
  }

  async retryGet<T> (url: string, config?: AxiosRequestConfig & { retryTimes?: number }) {
    const retryTimes = config && config.retryTimes ? config.retryTimes : 1
    for (let i = 0; i < retryTimes; i++) {
      try {
        const res = await this.get<T>(url, config)
        return res
      } catch (e) {
        if (i === retryTimes - 1) {
          return Promise.reject(new ClientHttpError(e.code, e.msg || e.message))
        }
      }
    }
    return Promise.reject(new ClientHttpError('CLIENT_TIMEOUT', '客户端错误'))
  }
}

export default Http