import request from '../service/request'

const api={
    user:{
        login:(data)=>request.post('/login',data),
        register:(data)=>request.post('/register',data),
        alluser:data=>request.get('/user',data),
        upuser:data=>request.post('/user/update',data),
        removeuser:data=>request.post('/user/delete',data),
        search:data=>request.get('/user/search?input='+data,data)
    },
    group:{
        grouplist:(data)=>request.get('/group/list',data),
        member:data=>request.get('/group/members',data),
        removegroup:data=>request.post('/group/delete',data),
        addgroup:data=>request.post('/group/add',data)
    }
}

export default api