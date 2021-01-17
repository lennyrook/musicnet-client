/******************************************************************************/
// import area

import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


/******************************************************************************/
// variables area

function mapStateToProps(state) {
    const { global } = state

    return {
        version: global.version,
        author_url: global.author_url
    }
}

class Footer extends Component {
    constructor(props) {
        super(props)

        this.className = this.constructor.name
        this.state = {}
    }

    render() {
        return (
            <div className='footer'>
                <AppBar position='static' className='bar'>
                    <Toolbar>
                        <Typography className='text' variant='caption'>
                            version {this.props.version} by <a href={this.props.author_url} target='_blank' rel="noopener noreferrer">Lenny</a>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Footer)