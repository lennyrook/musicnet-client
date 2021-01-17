/******************************************************************************/
// import area

import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'


/******************************************************************************/
// variables area

function mapStateToProps(state) {
    const { global } = state

    return {
        title: global.title
    }
}

class Header extends Component {
    constructor(props) {
        super(props)

        this.className = this.constructor.name
    }

    render() {
        return (
            <div className='header'>
                <AppBar position='static' className='bar'>
                    <Toolbar>
                        <IconButton edge='start' className='burger-menu' aria-label='menu'>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' className='title'>
                            MusicNet
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Header)