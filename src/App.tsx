import React, { Component } from 'react';
const classes = require('./App.css');
import Chat from './pages/chat/chat';
import Search from './pages/search/search';
import User from "./pages/user/user";
import Home from "./pages/home/home";
const { Route, Switch, Redirect } = require('react-router-dom');
import Spinner from './atoms/Spinner/Spinner';

class App extends Component<any, any> {

  render(){

      const {authCheckLoading, isLoggedIn} = this.props.auth;
        //認証ロード中はスピナー表示
      if(authCheckLoading) {
          return (
              <div className={classes.App}>
                  <Spinner />
              </div>
          );
      }

      let routes = null;
    //ログイン済みならコンテンツページへ
      if(isLoggedIn) {
          routes = (
              <Switch>
                  <Route path="/search" exact render={({match}: any) => (
                      <Search {...this.props} match={match} />
                  )}/>
                  <Route path="/users/:id" render={({match}: any) => (
                      <User {...this.props} match={match} />
                  )}/>
                  <Route path="/" exact render={({match}: any) => (
                      <Chat {...this.props} match={match} />
                  )}/>
                  <Redirect to={'/'} />
              </Switch>
          );
      }
    //ログインしていないならloginページへ
      if(!isLoggedIn) {
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
