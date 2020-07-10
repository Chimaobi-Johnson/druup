import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Home from './containers/Home/Home';
import AuthPage from './containers/auth/AuthPage';
import './App.css';

function App() {


  let routes;
   routes = (
     <>
      <Switch>
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

export default App;
