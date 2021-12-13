import { useEffect } from 'react'

import listeners from '../../utils/listener/base'
import useListener from '../../utils/listener/listener'

import { MicroAppProps } from '../../../typings/global'

const MicroApp = (props: MicroAppProps) => {
  const { init, clear } = useListener(props.name, listeners)

  useEffect(() => {
    init()
    return () => {
      clear()
    }
  }, [clear, init])

  return (
    <micro-app {...props}></micro-app>
  )
}

export default MicroApp
