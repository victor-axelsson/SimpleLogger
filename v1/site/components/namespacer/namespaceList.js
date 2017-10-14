/*jshint esversion: 6 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTANTS } from 'core/constants';
import { getAllNamespaces } from 'api/namespaceApi'
import NamespaceRow from './namespaceRow'

class NamespaceList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentWillMount(){
        this.props.getNamespaces(); 
    }

    buildNamespaceTree(){

        var buildNamespace = (ns, path, depth) => {
            if(!ns){
                return null;
            }

            var children = Object.keys(ns).map((key) => {
                return buildNamespace(ns[key], path + "/" + key, depth +1);
            });

            var curr = path.split("/")
            curr = curr[curr.length -1];
            return (
                <div key={path} style={{paddingLeft: (depth * 10)}}>
                    <NamespaceRow name={curr} namespace={path} >
                        { children }
                    </NamespaceRow>
                </div>
            )
        }

        return buildNamespace(this.props.namespaces, "", 0);
    }

    render() {
        return (
            <div>
               {this.buildNamespaceTree()}
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(NamespaceList);