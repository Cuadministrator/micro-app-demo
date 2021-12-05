import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import routes from "./page/Index"

import useChildren from './hook/children'
import useListener from "./hook/listener"

import listeners from './utils/baseListener'

export default function Plinth() {
  const children = useChildren()

  const { init, clear } = useListener(children, listeners)

  useEffect(() => {
    init()
    return () => {
      clear()
    }
  }, [init, clear])

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={routes.route.Base} />
          <Route path="/mp-list" component={routes.route.MpList} />
        </Switch>
      </div>
    </Router>
  );
}
