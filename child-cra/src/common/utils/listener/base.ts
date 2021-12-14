import microApp from "@micro-zoe/micro-app"
import { LoginUser } from '../../../typings/global'
import { BaseListener, DataType, getListeners, ListenerMap } from "./common"

export enum BASE_LISTENER {
  LOGIN = 'LOGIN',
  LOGIN_USER = 'LOGIN_USER',
}

const doLogin: BaseListener = () => {
  window.location.href = '/base/login'
}

const setLoginUser: BaseListener =  (data: DataType<LoginUser>) => {
  microApp.setGlobalData({
    type: BASE_LISTENER.LOGIN_USER,
    data: data.value,
  })
}

export const map: ListenerMap<typeof BASE_LISTENER> = {
  [BASE_LISTENER.LOGIN]: {
    func: doLogin,
  },
  [BASE_LISTENER.LOGIN_USER]: {
    func: setLoginUser,
    verify: (data: DataType<LoginUser>) => Boolean(data.value),
  },
}

const listeners = getListeners(map)

export default listeners
