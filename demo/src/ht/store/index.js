import {createStore,combineReducers} from 'redux'
import getList from './reducer/getList'

const reducers=combineReducers({
    getList,
})

const store=createStore(reducers)
export default store