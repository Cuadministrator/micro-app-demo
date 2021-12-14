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

// main to sub
export const useSubListener = (listeners: BaseListener[]) => {
  const micro = useMemo(() => (window as Window)?.microApp, [])
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
      micro?.addDataListener(baseListener)
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
      micro?.addGlobalDataListener(baseListener)
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
