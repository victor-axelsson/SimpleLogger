import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MyApp from '../core/reducers';
import { getRoute } from './router';
import { CONSTANTS } from '../core/constants';
import { ENV } from '../../../env';

const store = createStore(MyApp);

export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        let storeState = store.getState();
        return {};
    }

    render() {
        return (
            <Provider store={ store }>
                <div style={ { height: '100%' } }>
                    <p>This is the app from react</p>
                </div>
            </Provider>
        );
    }
}