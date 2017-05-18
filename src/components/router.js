import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import Home from './home';
import NewTrade from './newTrade';
import NewVersion from  './newVersion';

const router = () => {
    <div class="container">
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/trade" component={NewTrade} />
                <Route path="/version" component={NewVersion} />
            </Route>
        </Router>
    </div>
};

export default router;
