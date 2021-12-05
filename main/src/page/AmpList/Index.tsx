import React from 'react'

export const config = {
  name: 'mp-list',
  url: 'http://localhost:8000/',
  baseurl: '/mp-list',
}

const Base = () => {
  return (
    <micro-app
      {...config}
    ></micro-app>
  )
}

export default Base
