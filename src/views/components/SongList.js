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
    
    for(let [key, value] of entries) {
        let item = ( <SongItem key={key} {...value} /> )

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
            {
                !hasResults &&
                <Typography className='no-results' variant='subtitle1'>
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
    )
}

export default SongList