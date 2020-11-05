import React from 'react';
import { AuthRoute, ProtectedRoute } from './util/routes_util';
import { Switch } from 'react-router-dom';

import Landing from './components/landing';
import Login from './components/login';

const App = () => {
    return(
    <Switch>
        <AuthRoute exact path="/" component={Landing} />
        <AuthRoute path="/login" component={Login} />
    </Switch>
    );
};

export default App;