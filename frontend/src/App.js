import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Landing from './components/Landing/Landing';

function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle="Lunar VTT"
      >
      </Helmet>
      <Switch>
        <Route path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
