import React from 'react'
import { ROUTES } from 'core/constants'
import Home from './home'
import NamespaceDetails from 'components/namespacer/namespaceDetails'

export function getRoute(route) {
    console.log(route)
    if (route.name == ROUTES.HOME) {
        return (<Home {...route.passProps}/>);
    } else if(route.name == ROUTES.NAMESPACE_DETAILS){
        return (<NamespaceDetails {...route.passProps}/>);
    }else{
        //Default route
        return (<Home {...route.passProps}/>);
    }
}