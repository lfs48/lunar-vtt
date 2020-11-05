import React from 'react';
import { AuthRoute, ProtectedRoute } from './util/routes_util';
import { Switch } from 'react-router-dom';

import Landing from './components/landing';

const App = () => (
    <Switch>
        <AuthRoute exact path="/" component={Landing} />
    </Switch>
);

export default App;