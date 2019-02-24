import React, { Component } from 'react';
const classes = require('./App.css');
import axios from './axios-order';
import Chat from './pages/chat/chat';
import Search from './pages/search/search';
import User from "./pages/user/user";
import Home from "./pages/home/home";
const { Route, Switch, withRouter, Redirect } = require('react-router-dom');
import FluxContainer from "./fluxContainer";
import AuthAction from './modules/auth/authAction';
import Spinner from './atoms/Spinner/Spinner';

class App extends Component<any, any> {

  render() {

      if(this.props.auth.loading) {
          return (
              <div className={classes.App}>
                  <Spinner />
              </div>
          );
      }

      let routes = null;

      if(this.props.auth.isLoggedIn) {
          routes = (
              <Switch>
                  <Route path="/search" exact render={({match}: any) => (
                      <Search {...this.props} match={match} />
                  )}/>
                  <Route path="/users" render={({match}: any) => (
                      <User {...this.props} match={match} />
                  )}/>
                  <Route path="/" exact render={({match}: any) => (
                      <Chat {...this.props} match={match} />
                  )}/>
                  <Redirect to={'/'} />
              </Switch>
          );
      }

      if(!this.props.auth.isLoggedIn) {
          routes = (
              <Switch>
                  <Route path="/home" render={({match}: any) => (
                      <Home {...this.props} match={match} />
                  )}/>
                  <Redirect to={'/home/login'} />
              </Switch>
          );
      }

    return (
      <div className={classes.App}>
          {routes}
      </div>
    );
  }
}

export default App;
