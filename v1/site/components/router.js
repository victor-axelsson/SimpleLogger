import React from 'react'
import { ROUTES } from 'core/constants'
import Home from './home'

export function getRoute(route) {
    if (route.name == ROUTES.HOME) {
        return (<Home {...route.passProps}/>);
    } else {
        //Default route
        return (<Home {...route.passProps}/>);
    }
}