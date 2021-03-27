import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
        <Route exact path="/register" component={Register} />
        <Route path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
