import { useEffect } from 'react'

import listeners from '../../utils/listener/base'
import { useMainListener } from '../../utils/listener/listener'

import { MicroAppProps } from '../../../typings/global'

const MicroApp = (props: MicroAppProps) => {
  const { init, clear } = useMainListener(props.name, listeners)

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
