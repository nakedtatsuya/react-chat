import React, { Component } from 'react';
const classes = require('./App.css');
import Header from './organisms/header/header';
import axios from './axios-order';
import Chat from './pages/chat/chat';
import Search from './pages/search/search';
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
          <Header />
          <Switch>
              <Route path="/search" component={Search} />
              <Route path="/" exact component={Chat} />
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
