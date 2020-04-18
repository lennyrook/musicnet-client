import types from './types'

const initialState = {
    filter: [],
    results: undefined,
    filteredResults: undefined,
    term: undefined
}

function search(state = initialState, action) {
    let newState = Object.assign({}, state)

    switch(action.type) {
        case types.FILTER_INITIALISED: {
            newState.filter = action.payload
            break;
        }

        case types.FILTER_NEW: {
            newState.filter = action.payload.filter
            newState.filteredResults = action.payload.filteredResults
    
            break;
        }

        case types.SEARCH_INIT: {

            break;
        };

        case types.SEARCH_RESULTS: {
            newState.results = action.payload
            newState.filteredResults = action.payload

            break;
        };

        default: {}
    }

    return newState
}

export default search