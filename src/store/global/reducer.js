import types from './types'

const initialState = {
    url: 'https://github.com/JonasLenny',
    version: '0.0.0',
    sources: []
}

function global(state = initialState, action) {
    let newState = Object.assign({}, state)
    
    switch(action.type) {
        case types.LOAD_CONFIG_PENDING: {
            break;
        }

        case types.LOAD_CONFIG_SUCCESS: {
            newState = Object.assign(newState, {...action.config.body})

            break;
        }

        case types.LOAD_CONFIG_FAILURE: {
            break;
        }

        default: {}
    }

    return newState
}

export default global