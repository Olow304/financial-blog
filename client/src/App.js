// outside libraries
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import jwt_decode from "jwt-decode"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// my libraries
import Register from './components/auths/register'
import store from './store'
import setUserToken from './utils/userToken'
import { getCurrentUser, userLogout } from './actions/loginRegAction'
import PrivatePages from './helper/PrivatePages'
import Dashboard from './dashboard/Home'
import { clearCurrProfile } from './actions/userActions'
import './App.css';

// save date to local state 
if(localStorage.jwtToken){
  setUserToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(getCurrentUser(decoded))

  const currentTime = Date.now() / 3000
  if(decoded.exp < currentTime){
    store.dispatch(userLogout())
    store.dispatch(clearCurrProfile())

    window.location.href = "/dashboard"
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
        <Router>
        <div className="container-fluid">
          <Switch>
            <Route exact path="/register" component={Register} />
            <PrivatePages exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
        </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
