import { useMemo, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import microApp from '@micro-zoe/micro-app'

import MicroApp from './common/components/MicroApp/Index'

import useRouter, { BASE_ROUTER } from './route/Index'

export default function Plinth() {
  const routes = useRouter()

  useEffect(() => {
    return () => {
      // 清空基座应用绑定的全局数据函数
      microApp.clearGlobalDataListener()
    }
  }, [])

  return (
    <Router>
      <Switch>
        {
          routes.map(item => {
            const base = item.name === BASE_ROUTER
            return (
              <Route
                exact={base}
                path={base ? '/' : `/${item.name}`}
                component={ () =>  <MicroApp {...item} />}
              />
            )
          })
        }
      </Switch>
    </Router>
  )
}
