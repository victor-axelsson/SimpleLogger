// main.js
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import App from 'components/app';
render((
    <HashRouter>
        <Route
            path="/"
            component={ App }></Route>
    </HashRouter>
    ), document.getElementById('main'));
