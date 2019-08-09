const getList =(state=[],action)=>{
    let newstate=JSON.parse(JSON.stringify(state))
    switch(action.type){
        case "GET_LIST":
            newstate=action.data
            return [...newstate]
        default:
            return [...state]
    }
}
export default getList