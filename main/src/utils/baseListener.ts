export type DataType = {
  type: string
  value?: Object
}

export type BaseListener = (data: DataType) => void

export enum BASE_LISTENER {
  LOGIN = 'LOGIN'
}

const doLogin: BaseListener = (data) => {
  if (data.type !== BASE_LISTENER.LOGIN) return
  window.location.href = '/base/login'
}

export const mapping: { [key in BASE_LISTENER]: BaseListener } = {
  [BASE_LISTENER.LOGIN]: doLogin,
}

const listeners = Object.keys(mapping).map((key) => mapping[key as BASE_LISTENER])

export default listeners
