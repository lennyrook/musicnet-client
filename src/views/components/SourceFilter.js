/******************************************************************************/
// import area

import React from 'react';
import types from './../../store/search/types'

/******************************************************************************/
// variables area

const createSourceList = (source, onClick) => {
    let parsedList = []
    let rawList = source.entries()

    for(let [key, value] of rawList) {
        let entry = (
            <div key={key} id={value.name} className={`source-wrapper ${value.state}`} onClick={onClick}>
                <img className='image' src={value.image} />
            </div>
        )

        parsedList.push(entry)
    }

    return parsedList
}

const SourceFilter = ({ list, onClick }) => {
    let parsedList = createSourceList(list, onClick)

    return (
        <div className='source-filter'>
            { parsedList }
        </div>
    )
}

export default SourceFilter