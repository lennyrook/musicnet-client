/******************************************************************************/
// import area

import keyframePlaceholder from '../../assets/images/keyframePlaceholder.png'

import spotifyIcon from '../../assets/images/spotify_icon.png'
import youtubeIcon from '../../assets/images/youtube_icon.png'
import soundcloudIcon from '../../assets/images/soundcloud_icon.png'

import searchTypes from '../../store/search/types'

/******************************************************************************/
// variables area

const icons = {
    spotify: spotifyIcon,
    youtube: youtubeIcon,
    soundcloud: soundcloudIcon,
}

const placeholder = {
    keyframe: keyframePlaceholder
}

class Utils {
    parseArtists(source) {
        let response = ''
        let sourcelength = source.length
        let entries = source.entries()

        for(let [index, entry] of entries) {
            if(index < sourcelength - 1)
                response += `${entry}, `
            else
                response += entry
        }

        return response
    }

    getIcon(name) {
        return icons[name]
    }

    getPlaceholder(name) {
        return placeholder[name]
    }

    initialiseFilter(source, state) {
        let filter = []

        for(let entry of source) {
            let newEntry = {}

            newEntry.name = entry
            newEntry.state = state
            newEntry.image = this.getIcon(entry)

            filter.push(newEntry)
        }

        return filter
    }

    updateFilter(source, update) {
        let updatedFilter = Array.from(source)

        for(let entry of updatedFilter) {
            if(entry.name === update.name) {
                entry.state = update.state
                break;
            }
        }

        return updatedFilter
    }

    applyFilter(source, filter) {
        let filtered = []

        filtered = source.filter(entry => {
            const state = this.getFilterState(filter, entry.source)
            
            return state === searchTypes.FILTER_ACTIVE
        })

        return filtered
    }

    getFilterState(source, name) {
        let state = undefined

        for(let entry of source) {
            if(entry.name === name) {
                state = entry.state
                break;
            }
        }

        return state
    }

    getActiveFilter(source) {
        let activeList = source.filter(this.isActive)
        let activeNames = activeList.map(entry => entry = entry.name)

        return activeNames
    }

    isActive(source) {
        return source && source.state && source.state === searchTypes.FILTER_ACTIVE
    }
}

export default new Utils()