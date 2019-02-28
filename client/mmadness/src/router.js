import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Central from './central/central';
import User from './user/user';

class Router extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/central' component={ Central } />
                    <Route exact path='/' component={ User } />
                    <Redirect from='*' to='/' />
                </Switch>
            </BrowserRouter>
        );
    }
};

export default Router;