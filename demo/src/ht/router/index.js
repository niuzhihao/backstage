import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import RouteView from './routerView'
import routes from './routerConfig'
const Routers=()=>{
    return <Router>
        <RouteView routes={routes}></RouteView>
    </Router>
}
export default Routers