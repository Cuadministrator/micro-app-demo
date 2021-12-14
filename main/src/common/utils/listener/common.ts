export type DataType<T> = {
  type: string
  value?: T
}

export type BaseListener = (data: DataType<any>) => void

export type ListenerMap<T> = {
  [key in keyof T]: {
    func: BaseListener,
    verify?: (data: DataType<any>) => boolean
  }
}

export const getListeners = <T>(map: ListenerMap<T>) => (
  Object.keys(map).map((key): BaseListener => {
    const { func, verify } = map[key as keyof T]
    return (data) => (
      data.type === key && (!verify || (verify && verify(data)))
        ? func(data)
        : undefined
    )
  })
)