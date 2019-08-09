import React from 'react'

const Home = React.lazy(() => import('../components/Home'));

const routes=[{
    path:'/home',
    component:Home
},{
    path:'/',
    redirect:'/home'
}]


export default routes