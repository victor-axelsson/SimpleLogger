import { CONSTANTS, ROUTES } from '../constants';
import { initialState } from '../initialState';

export default function navigationReducer(state = initialState.navigation, action) {
    switch (action.type) {

        case CONSTANTS.NAVIGATE_TO_PAGE: 
            console.log(action.payload)
            return  Object.assign({}, state, {
                route: action.payload.route
            });

        default:
            return state;
    }
}