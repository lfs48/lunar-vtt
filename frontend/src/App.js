import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';

function App() {

  const {loggedIn} = useSelector( (state) => ({
    loggedIn: state.session.loggedIn
  }));

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle="Lunar VTT"
      >
      </Helmet>
      {loggedIn ?
        <Navbar />
      :<></>}
      <div className={`w-screen h-screen ${ loggedIn ? "pt-16" : ""}`}>
      <Switch>
        <AuthRoute exact path="/register" component={Register} />
        <AuthRoute path="/" component={Landing} />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
