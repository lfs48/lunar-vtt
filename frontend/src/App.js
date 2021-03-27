import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle="Lunar VTT"
      >
      </Helmet>
      <Switch>
        <AuthRoute exact path="/register" component={Register} />
        <AuthRoute path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
