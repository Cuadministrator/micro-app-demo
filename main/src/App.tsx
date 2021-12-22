import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import MicroApp from './common/components/MicroApp/Index'

import useRouter from './route/Index'

import { useGlobalListener } from './common/utils/listener/listener'
import listeners from './common/utils/listener/global'
import { doLogin } from './common/utils/listener/base'

export default function Plinth() {
  const routes = useRouter()
  const { init, clear } = useGlobalListener(listeners)

  useEffect(() => {
    init()
    return () => clear()
  }, [clear, init])

  useEffect(() => { doLogin() }, [])

  return (
    <Router>
      <Switch>
        {
          routes.map(item => {
            return (
              <Route
                key={item.name}
                path={`/${item.name}`}
                component={() =>  <MicroApp {...item} />}
              />
            )
          })
        }
        <Redirect exact from='/' to='/background' />
      </Switch>
    </Router>
  )
}
