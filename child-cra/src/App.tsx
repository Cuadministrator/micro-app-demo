import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import baseListeners from './common/utils/listener/base'
import globalListeners from './common/utils/listener/global'
import { useGlobalListener, useSubListener } from './common/utils/listener/listener'

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.
// @ts-ignore

export default function BasicExample() {
  const { init, clear } = useSubListener(baseListeners)
  const { init: initGlobal, clear: clearGlobal } = useGlobalListener(globalListeners)
  useEffect(() => {
    init()
    initGlobal()
    return () => {
      clear()
      clearGlobal()
    }
  }, [init, initGlobal, clear, clearGlobal])
  return (
    // @ts-ignore
    <Router basename={window.__MICRO_APP_BASE_URL__ || '/'}>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <div
              onClick={() => {
                // @ts-ignore
                window.microApp?.dispatch({type: 'LOGIN'})
              }}
            >send message to main</div>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2
        onClick={() => {
          // @ts-ignore
          const a = window.microApp?.getData()
          console.warn('a', a)
        }}
      >Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
