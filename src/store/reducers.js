// import area
import { combineReducers } from 'redux'

import global from './global/reducer'
import search from './search/reducer'

// variables area
const reducers = combineReducers({
    global,
    search
})


export default reducers