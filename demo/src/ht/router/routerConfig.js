import React from 'react'

const Alluser = React.lazy(() => import('../pages/alluser'));
const Login = React.lazy(() => import('../pages/login'));
const Register = React.lazy(() => import('../pages/register'));
const Group = React.lazy(() => import('../pages/grouplist'));
const Member = React.lazy(() => import('../pages/member'));

const routes=[{
    path:'/alluser',
    component:Alluser
},{
    path:'/login',
    component:Login
},{
    path:'/',
    redirect:'/alluser'
},{
    path:'/register',
    component:Register
},{
    path:'/group',
    component:Group
},{
    path:'/member',
    component:Member
}]


export default routes