/**
 * 用于 基座 和 子应用 通信
 */
import microApp from "@micro-zoe/micro-app"

export type DataType = {
  type: string
  value?: Object
}

export type BaseListener = (data: DataType) => void

export enum BASE_LISTENER {
  LOGIN = 'LOGIN',
  LOGIN_USER = 'LOGIN_USER',
}

type Mapping = {
  [key in BASE_LISTENER]: {
    func: BaseListener,
    verify?: (data: DataType) => boolean
  }
}

const doLogin: BaseListener = () => {
  window.location.href = '/base/login'
}

const setLoginUser: BaseListener =  (data) => {
  microApp.setGlobalData({
    type: BASE_LISTENER.LOGIN_USER,
    data: data.value,
  })
}

export const mapping: Mapping = {
  [BASE_LISTENER.LOGIN]: {
    func: doLogin,
  },
  [BASE_LISTENER.LOGIN_USER]: {
    func: setLoginUser,
    verify: (data: DataType) => Boolean(data.value),
  },
}

const listeners = Object.keys(mapping).map((key): BaseListener => {
  const { func, verify } = mapping[key as BASE_LISTENER]
  return (data) => (
    data.type === key && (!verify || (verify && verify(data)))
      ? func(data)
      : undefined
  )
})

export default listeners
