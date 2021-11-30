import React, { useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import microApp from '@micro-zoe/micro-app'

import route from './page/Index'

const { Base } = route

export default function Plinth() {
  const dataListener = useCallback(
    (data) => console.warn('dataListener', data),
    [],
  )

  useEffect(() => {
    return () => {
      // 清空基座应用绑定的全局数据函数
      microApp.clearGlobalDataListener()
    }
  }, [dataListener])
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Base} />
          <Route path="/child-cra">
            <CRAChild />
          </Route>
          <Route path="/child-antd">
            <AntdChild />
          </Route>
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
