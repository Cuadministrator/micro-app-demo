import microApp from "@micro-zoe/micro-app"
import { BaseListener, DataType, getListeners, ListenerMap } from "./common"

export enum BASE_LISTENER {
  LOGIN = 'LOGIN',
  LOGIN_USER = 'LOGIN_USER',
}

export const doLogin = async () => {
  // const res = await getCurrentUser()
  // if (res && res.data) {
  //   microApp.setGlobalData({
  //     type: BASE_LISTENER.LOGIN_USER,
  //     data: res.data,
  //   })
  // }
}

const setLoginUser: BaseListener =  (data: DataType<API.CurrentUser>) => {
  microApp.setGlobalData({
    type: BASE_LISTENER.LOGIN_USER,
    data: data.data,
  })
}

export const map: ListenerMap<typeof BASE_LISTENER> = {
  [BASE_LISTENER.LOGIN]: {
    func: doLogin,
  },
  [BASE_LISTENER.LOGIN_USER]: {
    func: setLoginUser,
    verify: (data: DataType<API.CurrentUser>) => Boolean(data.data),
  },
}

const listeners = getListeners(map)

export default listeners
