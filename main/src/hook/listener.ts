import { useCallback } from 'react'
import microApp from '@micro-zoe/micro-app'
import { BaseListener } from '../utils/baseListener'

const useListener = (children: string[], listeners: BaseListener[]) => {
  const baseListener = useCallback(
    (data) => {
      listeners.forEach(plugin => {
        plugin.apply(null, [data])
      })
    },
    [listeners],
  )

  const init = useCallback(
    () => {
      children.forEach((child) => {
        microApp.addDataListener(child, baseListener)
      })
    },
    [baseListener, children],
  )

  const clear = useCallback(
    () => {
      children.forEach((child) => {
        microApp.clearDataListener(child)
      })
      // 清空基座应用绑定的全局数据函数
      microApp.clearGlobalDataListener()
    },
    [children],
  )

  return {
    init,
    clear,
  }
}

export default useListener
