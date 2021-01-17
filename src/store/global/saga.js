/******************************************************************************/
// import area

import { all, call, take, put } from 'redux-saga/effects'

import types from './types'
import router from './../router/types'

import basic from '../../data/utils/api/basic'
import host from '../../data/utils/api/host'

/******************************************************************************/
// variables area

function* sagas() {
    yield all([
        watchInitialiseApplication()
    ])
}

function* watchInitialiseApplication() {
    while (yield take(types.INIT_APPLICATION)) {
        yield call(initialiseApplication)
    }
}

function* initialiseApplication() {

    // 1. change to loading screen
    yield put({ type: router.PAGE_CHANGE, payload: router.PAGE_LOADING })

    // 2. load config file
    const config = yield call(loadConfig)

    // 3. if available - check session
    if (!config) {
        yield put({ type: router.PAGE_CHANGE, payload: router.PAGE_ERROR })
    }
    else {
        const sessionState = yield call(host.checkSession, config.host)

        // if the session is available
        if (sessionState)
            yield put({ type: router.PAGE_CHANGE, payload: router.PAGE_ACTIVE })

        // if not change to inactive
        else
            yield put({ type: router.PAGE_CHANGE, payload: router.PAGE_INACTIVE })
    }
}


/******************************************************************************/
// helper functions

function* loadConfig() {
    let response = undefined

    yield put({ type: types.LOAD_CONFIG_PENDING })

    // 1. fetch config
    const config = yield call(basic.get, '/config.json')

    // 2. save config
    if (config.statusCode >= 400)
        yield put({ type: types.LOAD_CONFIG_FAILURE, config })
    else {
        yield put({ type: types.LOAD_CONFIG_SUCCESS, config })
        response = config.body
    }

    return response
}

export default sagas