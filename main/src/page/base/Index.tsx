import React from 'react'

export const config = {
  name: 'base',
  url: 'http://localhost:8000/',
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
