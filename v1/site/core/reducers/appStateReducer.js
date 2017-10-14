import { CONSTANTS } from '../constants';
import { initialState } from '../initialState';

export default function appStateReducer(state = initialState.appState, action) {
    switch (action.type) {

        case CONSTANTS.GOT_NAMESPACES: 
            var newState = Object.assign({}, state, {
                namespaces: action.payload
            });

            return newState;

        case CONSTANTS.SET_ACTIVE_NAMESPACE: 
            return Object.assign({}, state, {
                activeNamespace: action.payload
            });

        case CONSTANTS.GOT_ENTRIES: 
            return Object.assign({}, state, {
                entries: action.payload
            });
       
        default:
            return state;
    }
}