/******************************************************************************/
// import area

import React from 'react';
import Typography from '@material-ui/core/Typography'

import SongItem from './SongItem'

/******************************************************************************/
// variables area

const parseList = (source) => {
    let parsedList = []
    let entries = Object.entries(source)
    let numberOfEntries = entries.length

    for(let [index, value] of entries) {
        const spacer = index < numberOfEntries - 1 ? 'spacer' : null
        let item = ( <SongItem key={index} spacer={spacer} {...value} /> )

        parsedList.push(item)
    }

    return parsedList
} 

const SongList = ({ list }) => {
    const rawList = list
    const hasResults = rawList && rawList.length > 0
    const parsedList = hasResults ? parseList(rawList) : null
    const noResults = !rawList ? 'Enter a title or interpret to see results.' : 'nothing found :('

    return (
        <div className='song-list'>
            <div className='overflow-wrapper'>
                <div className='overflow-container'>
                    {
                        !hasResults &&
                        <Typography className='no-results' variant='subtitle1' align='center'>
                            { noResults }
                        </Typography>
                    }

                    {
                        hasResults &&
                        <div className='list'>
                            { parsedList }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SongList