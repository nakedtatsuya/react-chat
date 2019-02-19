import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from './axios-order';

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
              {this.state.users.map((user: {name: string, email: string}) => {

                  return (
                      <div>
                        <h1>{user.name}</h1>
                        <p>{user.email}</p>
                      </div>
                  );
              })}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
