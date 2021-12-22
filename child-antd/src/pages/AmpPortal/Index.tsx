import React, { useEffect } from 'react';
import { useMainListener } from '@/utils/listener/listener';
import listeners from '@/utils/listener/base';

const config = { name: 'ampPortal', url: 'http://localhost:8000/' }

export default (): React.ReactNode => {
  const { init, clear } = useMainListener(config.name, listeners)

  useEffect(() => {
    init()
    return () => {
      clear()
    }
  }, [clear, init])

  return (
    <>
      <micro-app {...config}></micro-app>
    </>
  )
};
