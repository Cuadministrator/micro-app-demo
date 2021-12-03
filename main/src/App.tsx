import React, { useMemo, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import microApp from '@micro-zoe/micro-app'

import routes from "./page/Index"

import useListener, { Plugin } from "./hook/listener"

import { MicroAppConfig } from "./typings/global"

export default function Plinth() {
  const children: string[] = useMemo(() => {
    const config: { [key: string]: MicroAppConfig } = routes.config
    const keys = Object.getOwnPropertyNames(config)
    return keys.map(key => config[key].name)
  }, [])

  const plugins: Plugin[] = []

  const { init, clear } = useListener(children, plugins)

  useEffect(() => {
    init()
    return () => {
      clear()
      // 清空基座应用绑定的全局数据函数
      microApp.clearGlobalDataListener()
    }
  }, [init, clear])

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={routes.route.Base} />
          <Route path="/child-cra" component={CRAChild} />
          <Route path="/child-antd" component={AntdChild} />
        </Switch>
      </div>
    </Router>
  );
}

function AntdChild () {
  return (
    <div>
      <h1>
        AntdChild
      </h1>
      <micro-app name='child-antd' url='http://localhost:8000/' baseurl='/child-antd'></micro-app>
    </div>
  )
}

function CRAChild() {
  return (
    <div>
      <h1>CRAChild</h1>
      <micro-app name='child-cra' url='http://localhost:3012/' baseurl='/child-cra'></micro-app>
    </div>
  );
}
