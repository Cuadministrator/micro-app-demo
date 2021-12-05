import React from 'react'

export const config = {
  name: 'base',
  url: 'http://localhost:3012/',
  baseurl: '/base',
}

const Base = () => {
  return (
    <micro-app
      {...config}
    ></micro-app>
  )
}

export default Base
