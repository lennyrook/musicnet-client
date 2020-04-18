/******************************************************************************/
// import area

import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

/******************************************************************************/
// variables area

const Loader = ({ title }) => {
    return (
        <div className='loader'>
            <CircularProgress className='progress' />
            <Typography className='text' variant='caption'>
                { title }
            </Typography>
        </div>
    )
}

export default Loader