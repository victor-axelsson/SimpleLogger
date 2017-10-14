/*jshint esversion: 6 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTANTS, COLORS } from 'core/constants';
import { getAllNamespaces } from 'api/namespaceApi'

class NamespaceRow extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {
            hover: false
        };
    }

    render() {
        return (
            <div style={this.state.hover ? styles.onHover: styles.onNonHover }onMouseEnter={() => {
                this.setState({
                    hover: true
                })
            }} onMouseLeave={() => {
                this.setState({
                    hover: false
                })
            }}
            onClick={(e) => {
                e.stopPropagation();
                console.log("Press: " + this.props.namespace)
            }}>
               <p > - {this.props.name} </p>
               { this.props.children }
            </div>
        );
    }
}

const styles = {

    onHover: {
        backgroundColor: COLORS.PRIMARY_LIGHT,
        padding: 10
    },
    onNonHover: {
        backgroundColor: COLORS.LIGHT,
        padding: 10
    }
}

const mapStateToProps = (state) => {
    return {
        namespaces: state.appState.namespaces
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNamespaces : () => {
            getAllNamespaces(dispatch); 
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NamespaceRow);