import React, { Component } from 'react';
import { HashRouter, Switch , Route, Redirect} from "react-router-dom"
import {isAuthenticated} from './services/Firebase'
import Login from "./views/Login"
import Menu from "./views/Menu"
function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route
      {...rest}
      render={props => isAuthenticated() ? (
        <>
          <Component {...props} />
        </>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
      }
    />
  }



  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <PrivateRoute path="/menu" component={Menu} />
        <Route path="*" component={Login} />
      </Switch>
    </HashRouter>
  );
}

export default App;
