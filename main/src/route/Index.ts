import { useState, useEffect } from 'react'

import { MicroAppProps } from "../typings/global"

export const BASE_ROUTER = 'base'

const useRouter = () => {
  const [routes, setRoutes] = useState<MicroAppProps[]>([])

  useEffect(() => {
    setRoutes([
      { name: 'base', url: 'http://localhost:3012/' },
      { name: 'mp-list', url: 'http://localhost:8000/' },
    ])
  }, [])

  return routes
}

export default useRouter
