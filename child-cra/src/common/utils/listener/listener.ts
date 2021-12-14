import { useMemo, useCallback } from 'react'
import microApp from '@micro-zoe/micro-app'

import { BaseListener } from './common'
import { Window } from '../../../typings/global'


// sub to main
export const useMainListener = (appName: string, listeners: BaseListener[]) => {
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
      microApp.addDataListener(appName, baseListener, true)
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

// main to sub
export const useSubListener = (listeners: BaseListener[]) => {
  const micro = useMemo(() => (window as Window)?.microApp, [])
  const baseListener = useCallback(
    (data) => {
      console.warn('data', data)
      listeners.forEach(listener => {
        listener.apply(null, [data])
      })
    },
    [listeners],
  )

  const init = useCallback(
    () => {
      micro?.addDataListener(baseListener, true)
    },
    [micro, baseListener],
  )

  const clear = useCallback(
    () => {
      micro?.clearDataListener()
    },
    [micro],
  )

  return {
    init,
    clear,
  }
}

// global
export const useGlobalListener = (listeners: BaseListener[]) => {
  const micro = useMemo(() => (window as any).microApp || microApp, [])
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
      /**
       * 绑定监听函数
       * dataListener: 绑定函数
       * autoTrigger: 在初次绑定监听函数时有缓存数据，是否需要主动触发一次，默认为false
       */
      micro?.addGlobalDataListener(baseListener, true)
    },
    [micro, baseListener],
  )

  const clear = useCallback(
    () => {
      micro?.clearGlobalDataListener()
    },
    [micro],
  )

  return {
    init,
    clear,
  }
}
