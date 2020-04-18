/******************************************************************************/
// import area

import { all, call, take, takeEvery, put, select } from 'redux-saga/effects'

import types from './types'
import globalTypes from '../global/types'

import Utils from '../../data/utils/utils'
import music from '../../data/utils/api/music'


/******************************************************************************/
// variables area

const getHost = state => state.global.host
const getSources = state => state.global.sources
const getFilter = state => state.search.filter
const getResults = state => state.search.results

function* sagas() {
    yield all([
        watchInitialise(),
        watchFilterChanged(),
        watchSearchRequest(),
    ])
}

function* watchInitialise() {
    while(true) {
        const { payload } = yield take(globalTypes.LOAD_CONFIG_SUCCESS)
        yield call(initialise, payload)
    }
}

function* initialise() {
    const sources = yield select(getSources)
    let filter = Utils.initialiseFilter(sources, types.FILTER_ACTIVE)
    
    yield put({ type: types.FILTER_INITIALISED, payload: filter})
}

function* watchFilterChanged() {
    while(true) {
        const { payload } = yield take(types.FILTER_CHANGED)
        yield call(filterChanged, payload)
    }
}

function* filterChanged(action) {
    let filter = yield select(getFilter)
    let results = yield select(getResults)
    let filteredResults = []

    filter = Utils.updateFilter(filter, action)

    if(results && results.length > 0)
        filteredResults = Utils.applyFilter(results, filter)

    yield put({ type: types.FILTER_NEW, payload: {filter, filteredResults}})
}

function* watchSearchRequest() {
    yield takeEvery(types.SEARCH_INIT, searchRequest)
}

function* searchRequest(action) {
    const host = yield select(getHost)
    let filter = yield select(getFilter)
    let payload = {}
    
    filter = Utils.getActiveFilter(filter)
    
    payload.term = action.payload
    payload.filter = filter

    // 1. change to loading screen
    // yield put({ type: router.PAGE_CHANGE, payload: router.PAGE_LOADING })
    // yield console.log(`[Saga Search] searching for:`);
    // yield console.log(action);

    // 2. send search request
    let results = yield call(music.search, host, payload)
    
    // 3. if results - show them
    if(results && results.length > 0)
        results = yield parseSongs(results)

    // yield console.log(`[Saga Search] received results`);
    // yield console.log(results)
    yield put({ type: types.SEARCH_RESULTS, payload: results})

    // catch error - show error
}


/******************************************************************************/
// helper functions

// TODO: move this to Utils
function parseSongs(source) {
    let response = []

    for(let entry of source) {
        let newEntry = {}

        newEntry.keyframe = entry.image ? entry.image : Utils.getPlaceholder('keyframe')
        newEntry.song = entry.track
        newEntry.artists = Utils.parseArtists(entry.artists)
        newEntry.source = entry.source
        newEntry.sourceIcon = Utils.getIcon(entry.source)

        response.push(newEntry)
    }

    return response
}

export default sagas