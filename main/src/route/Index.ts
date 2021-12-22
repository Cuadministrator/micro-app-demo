import { useState, useEffect } from 'react'

import { MicroAppProps } from "../typings/global"

export const BASE_ROUTER = 'background'

const useRouter = () => {
  const [routes, setRoutes] = useState<MicroAppProps[]>([])

  useEffect(() => {
    setRoutes([
      { name: 'background', url: 'http://localhost:8001/' },
      { name: 'ampPortal', url: 'http://localhost:8000/' },
    ])
  }, [])

  return routes
}

export default useRouter
