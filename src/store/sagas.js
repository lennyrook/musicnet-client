/******************************************************************************/
// import area

import { all } from 'redux-saga/effects'

import router from './router/saga'
import global from './global/saga'
import search from './search/saga'

/******************************************************************************/
// variables area

function* sagas() {
    yield all([
        router(),
        global(),
        search()
    ])
}

export default sagas