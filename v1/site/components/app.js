import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MyApp from '../core/reducers';
import { getRoute } from './router';
import { CONSTANTS } from '../core/constants';
import { ENV } from '../../../env';
import Header from './header'

const store = createStore(MyApp);

export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        let storeState = store.getState();
        return {
        	route: storeState.navigation.route.name
        };
    }

    render() {
        return (
            <Provider store={ store }>
                <div style={ { height: '100%' } }>
                	<Header />
                    { getRoute(this.state.route) }
                </div>
            </Provider>
        );
    }
}