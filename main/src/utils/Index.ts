import { useState, useCallback } from 'react'
import microApp from '@micro-zoe/micro-app'

import { Window } from '../typings/global'

const useGlobal = () => {
  const microWindow: Window = window
  const [global, setGlobal] = useState()
  const get = useCallback(
    () => {
      microWindow.microApp?.getData()
    },
    [microWindow],
  )
  const set = useCallback(
    () => {
      microWindow.microApp?.dispatch({type: '子应用发送的数据'})
    },
    [microWindow],
  )
  return [global, setGlobal]
}
