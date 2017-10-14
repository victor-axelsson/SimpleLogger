import { CONSTANTS } from '../constants';
import { initialState } from '../initialState';

export default function appStateReducer(state = initialState.appState, action) {
    switch (action.type) {

        case CONSTANTS.GOT_NAMESPACES: 
            var newState = Object.assign({}, state, {
                namespaces: action.payload
            });
            
            return newState;
       
        default:
            return state;
    }
}