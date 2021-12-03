import { useCallback } from 'react'
import microApp from '@micro-zoe/micro-app'

type dataType = {
  type: string
  value: Object
}

export type Plugin = (data: dataType) => void

const doLogin: Plugin = (data) => {
  if (data.type !== 'doLogin') return
  window.location.href = '/base/login'
}

const useListener = (children: string[], plugins: Plugin[]) => {
  const baseListener = useCallback(
    (data) => {
      plugins.forEach(plugin => {
        plugin.apply(null, [data])
      })
    },
    [plugins],
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
    },
    [children],
  )

  return {
    init,
    clear,
  }
}

export default useListener
