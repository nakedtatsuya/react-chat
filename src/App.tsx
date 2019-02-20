import React, { Component } from 'react';
const classes = require('./App.css');
import axios from './axios-order';
import Chat from './pages/chat/chat';
import Search from './pages/search/search';
import User from "./pages/user/user";
const { Route, Switch } = require('react-router-dom');

class App extends Component {

  state = {
            users: []
        };

    componentDidMount() {
        axios.get('/users')
            .then((results) => {
                console.log(results);
                this.setState({users: results.data})
            })
            .catch((data) =>{
                console.log(data);
            })
    }


  render() {
    return (
      <div className={classes.App}>
          <Switch>
              <Route path="/search" exact component={Search} />
              <Route path="/users" component={User} />
              <Route path="/" component={Chat} />
          </Switch>
          {/*{this.state.users.map((user: {name: string, email: string}) => {*/}
              {/*return (*/}
                  {/*<div>*/}
                    {/*<h1>{user.name}</h1>*/}
                    {/*<p>{user.email}</p>*/}
                  {/*</div>*/}
              {/*);*/}
          {/*})}*/}

      </div>
    );
  }
}

export default App;
