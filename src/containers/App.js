import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../components/Login/Login';
import { UsersList } from '../components/UsersList/UsersList';
import NoMatch from '../components/NoMatch/NoMatch';

import './App.css';

class App extends Component {
  state = {
    username: '',
    password: '',
    isAuthenticated: false,
    authToken: null
  }

  logIn = (state) => {
    this.setState({ ...state });
    console.log(this.state);
  }

  logOut = () => {
    const newState = { username: '', password: '', isAuthenticated: false, authToken: null }
    this.setState({ ...newState });
    console.log(this.state);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => <Login {...props} login={this.logIn} />} />
          <Route path="/users-list/" render={(props) => <UsersList {...props} logout={this.logOut} state={this.state} />} />
          <Route render={(props) => <UsersList {...props} logout={this.logOut} state={this.state} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
