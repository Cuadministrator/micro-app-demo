import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import microApp from '@micro-zoe/micro-app'

import MicroApp from './common/components/MicroApp/Index'

import useRouter, { BASE_ROUTER } from './route/Index'

import { useGlobalListener } from './common/utils/listener/listener'
import listeners from './common/utils/listener/global'

export default function Plinth() {
  const routes = useRouter()
  const { init, clear } = useGlobalListener(listeners)

  useEffect(() => {
    init()
    microApp.setData('base', {type: 'LOGIN_USER', value: 123 })
    return () => clear()
  }, [clear, init])

  return (
    <Router>
      <Switch>
        {
          routes.map(item => {
            const base = item.name === BASE_ROUTER
            return (
              <Route
                key={item.name}
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
