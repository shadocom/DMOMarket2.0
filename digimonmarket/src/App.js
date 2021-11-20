import React, { Component } from 'react';
import { HashRouter, Switch , Route, Redirect} from "react-router-dom"
import {isAuthenticated} from './services/Firebase'
import Login from "./views/Login"
import Home from "./views/Home"
import Menu from './components/Menu';
import Criaranuncio from './views/Criaranuncio'
import Footer from "./components/Footer"
function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route
      {...rest}
      render={props => isAuthenticated() ? (
        <>
          <Menu/>
          <Component {...props} />
          <Footer/>
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
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/criaranuncio" component={Criaranuncio} />
        <Route path="*" component={Login} />
      </Switch>
    </HashRouter>
  );
}

export default App;
