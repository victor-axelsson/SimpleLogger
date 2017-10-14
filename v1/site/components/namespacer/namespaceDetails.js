/*jshint esversion: 6 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTANTS } from 'core/constants';
import { getAllNamespaces } from 'api/namespaceApi'
import { getDataEntries } from 'api/namespaceApi'
import NamespaceRow from './namespaceRow'

class NamespaceDetails extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentWillMount(){
        this.props.getDataEntries(this.props.activeNamespace); 
    }

    renderRows(){
        if(!this.props.entries){
            return null; 
        }

        return this.props.entries.map((entry, i) => {
            return (
                <tr key={entry.id} style={i % 2 == 0 ? styles.even : styles.odd}>
                    <td style={styles.col}>{entry.namespace}</td>
                    <td style={styles.col}>{entry.key}</td>
                    <td style={styles.col}>{entry.val}</td>
                    <td style={styles.col}>{entry.created_at}</td>
                </tr>
            );
        });
    }

    render() {
    
        return (
            <div style={{padding: 10}}>
                <h1>Go home</h1>
                <table style={{width: '100%'}}>
                <thead> 
                  <tr>
                    <th>Namespace</th>
                    <th>Key</th> 
                    <th>Value</th>
                    <th>Time</th>
                  </tr>
                  </thead>
                  <tbody> 

                     {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const styles = {
    even: {
        backgroundColor: '#AAA',
        padding: 10
    },
    odd: {
        backgroundColor: '#CCC', 
        padding: 10
    },
    col: {
        padding: 10
    }
}

const mapStateToProps = (state) => {
    return {
        activeNamespace: state.appState.activeNamespace,
        entries: state.appState.entries
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDataEntries: (namespace) => {
            dispatch({
                type: CONSTANTS.GOT_ENTRIES,
                payload: null
            })
            getDataEntries(namespace, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NamespaceDetails);