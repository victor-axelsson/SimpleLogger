/*jshint esversion: 6 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTANTS } from 'core/constants';


class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    render() {
        return (
            <div>
               <p>This is the home screen</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);