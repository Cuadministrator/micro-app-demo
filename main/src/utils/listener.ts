import React, { useEffect } from 'react'
import microApp from '@micro-zoe/micro-app'

type dataType = {
  type: string
  value: Object
}

type Plug = (data: dataType) => void

const plugA: Plug = (data) => {
  if (data.type !== 'login') return
  // 处理
}

const plugs: Plug[] = [plugA]

const baseListener = (data: dataType) => {
  plugs.forEach(plug => {
    plug.apply(null, [data])
  })
}

export const useListener = (children: string[]) => {
  useEffect(() => {
    children.forEach((child) => {
      microApp.addDataListener(child, baseListener)
    })

    return () => {
      children.forEach((child) => {
        microApp.clearDataListener(child)
      })
    }
  }, [children])
}
