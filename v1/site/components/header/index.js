/*jshint esversion: 6 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTANTS, COLORS } from 'core/constants';


class Header extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    render() {
        return (
            <div style={{ backgroundColor: COLORS.PRIMARY_DARK, padding: 20, textAlign: 'center' }}>
              <h1 style={{color: COLORS.PRIMARY_LIGHT}}> { this.props.title }</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.navigation.route.title
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);