import React from 'react'

const Alluser = React.lazy(() => import('../pages/alluser'));
const Login = React.lazy(() => import('../pages/login'));
const Register = React.lazy(() => import('../pages/register'));
const Group = React.lazy(() => import('../pages/grouplist'));
const Member = React.lazy(() => import('../pages/member'));
const StartVote=React.lazy(()=>import ('../pages/startvote'))
const Votelist=React.lazy(()=>import ('../pages/votelist'))

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
},{
    path:'/startvote',
    component:StartVote
},{
    path:"/votelist",
    component:Votelist
}]


export default routes