/******************************************************************************/
// import area

import React from 'react';
import Typography from '@material-ui/core/Typography'

/******************************************************************************/
// variables area

// props = {
//     keyframe,
//     song,
//     artists,
//     searchSource
// }

const SongItem = (props) => {
    return (
        <div className='song-item'>
            <div className='keyframe-wrapper'>
                <img src={props.keyframe} />
            </div>

            {/* show placeholder if no text is available */}
            <div className='text'>
                <Typography className='song' variant='body1'>
                    { props.song ? props.song : 'no song name available' }
                </Typography>
                <Typography className='artists' variant='subtitle2'>
                    { props.artists ? props.artists : 'no artist available'}
                </Typography>
            </div>

            {/* if source image is available */}
            {
                props.sourceIcon &&
                <div className='source-wrapper'>
                    <img className='image' src={props.sourceIcon} />
                </div>
            }
        </div>
    )
}

export default SongItem