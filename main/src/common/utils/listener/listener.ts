import { useCallback } from 'react'
import microApp from '@micro-zoe/micro-app'

import { BaseListener } from './base'

const useListener = (appName: string, listeners: BaseListener[]) => {
  const baseListener = useCallback(
    (data) => {
      listeners.forEach(listener => {
        listener.apply(null, [data])
      })
    },
    [listeners],
  )

  const init = useCallback(
    () => {
      microApp.addDataListener(appName, baseListener)
    },
    [appName, baseListener],
  )

  const clear = useCallback(
    () => {
      microApp.clearDataListener(appName)
    },
    [appName],
  )

  return {
    init,
    clear,
  }
}

export default useListener
