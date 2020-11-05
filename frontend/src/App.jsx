import React from 'react';
import { AuthRoute, ProtectedRoute } from './util/routes_util';
import { Switch } from 'react-router-dom';

import Landing from './components/landing';
import Login from './components/login';
import Navbar from './components/navbar';
import Register from './components/register';

const App = () => {
    return(
      <main>
      <Navbar />
      <Switch>
          <AuthRoute exact path="/" component={Landing} />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
      </Switch>
    </main>
    );
};

export default App;