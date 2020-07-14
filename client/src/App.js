import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import TopNav from './containers/Navigation/TopNav';
import Home from './containers/Home/Home';
import WriteComment from './containers/Comment/WriteComment';
import AuthPage from './containers/auth/AuthPage';
import './App.css';

  class App extends Component {

  render () {
  let routes;
   routes = (
     <>
      <Switch>
        <Route path="/user/write-comment-about-me/:id" component={WriteComment} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
     </>
     )

  return (
    <div className="App">
       {routes}
    </div>
  );
}
}

export default App;
