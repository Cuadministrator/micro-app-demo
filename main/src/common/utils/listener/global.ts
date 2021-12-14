import store from "../../../store/Index"
import { LoginUser } from "../../../typings/global"
import { BaseListener, DataType, getListeners, ListenerMap } from "./common"

enum GLOBAL_LISTENER {
  LOGIN_USER = 'LOGIN_USER',
}

const setLoginUser: BaseListener = (data: DataType<LoginUser>) => {
  store.globalStore.changeLoginUser(data.value)
}

const map: ListenerMap<typeof GLOBAL_LISTENER> = {
  [GLOBAL_LISTENER.LOGIN_USER]: {
    func: setLoginUser,
    verify: (data: DataType<LoginUser>) => Boolean(data.value),
  },
}

const listeners = getListeners(map)

export default listeners

