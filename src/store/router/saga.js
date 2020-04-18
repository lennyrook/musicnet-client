/******************************************************************************/
// import area

import { all, call, take } from 'redux-saga/effects'

import types from './types'

import history from '../../data/utils/history'

/******************************************************************************/
// variables area

function* sagas() {
    yield all([
        watchPageChange()
    ])
}

function* watchPageChange() {
    while(true) {
        const { payload } = yield take(types.PAGE_CHANGE)
        yield call(changePage, payload)
    }
}

function* changePage(payload) {
    history.push(payload)
}


/******************************************************************************/
// helper functions


export default sagas