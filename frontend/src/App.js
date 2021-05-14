import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Dashboard from './components/Dashboard/Dashboard';
import Wrapper from './components/Wrapper/Wrapper';

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
      <div className="overflow-hidden">
      <Wrapper>
        <Switch>
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/" component={Landing} />
          <Route component={NotFoundPage} />
        </Switch>
      </Wrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;
