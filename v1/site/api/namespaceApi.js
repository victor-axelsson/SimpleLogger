import { post, get } from 'core/http'
import { CONSTANTS, ROUTES } from 'core/constants'

export function getAllNamespaces(dispatch){
	get('/namespace', (err, res) => {
        if(err) throw err; 

        dispatch({
        	type: CONSTANTS.GOT_NAMESPACES,
        	payload: res
        }); 
    });
}

export function getDataEntries(namespace, dispatch){
	get('/entry' + namespace, (err, res) => {
        if(err) throw err; 

        dispatch({
        	type: CONSTANTS.GOT_ENTRIES,
        	payload: res
        }); 
    });
}