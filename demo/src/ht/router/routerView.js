import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
const RouteView =(props)=>{
    let {routes}=props
    let redirect=routes.filter(item=>item.redirect).map((item,index)=><Redirect key={index} from={item.path} to={item.redirect}></Redirect>) 
    let routers=routes.filter(item=>!item.redirect)
    return <Switch>
        {
            routers&&routers.map((item,index)=><Route key={index} path={item.path} render={(props)=>{
                return <item.component {...props} routes={item.children}></item.component>
            }}></Route>).concat(redirect)
        }
    </Switch>
}

export default RouteView