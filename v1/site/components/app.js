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
        this.unsubscribe = store.subscribe(() => {
            this._onChange();
            this.forceUpdate();
        });
    }

    _onChange(){
    	this.setState(this._getInitialState());
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    _getInitialState() {
        let storeState = store.getState();
        return {
        	route: storeState.navigation.route
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