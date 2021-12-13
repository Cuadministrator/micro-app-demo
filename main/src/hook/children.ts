import { useMemo } from 'react'
import { MicroAppProps } from '../typings/global'

import routes from "../page/Index"

const useChildren = () => {
  const children: string[] = useMemo(() => {
    const config: { [key: string]: MicroAppProps } = routes.config
    const keys = Object.getOwnPropertyNames(config)
    return keys.map(key => config[key].name)
  }, [])
  return children
}

export default useChildren
