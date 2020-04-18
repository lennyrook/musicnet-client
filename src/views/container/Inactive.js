/******************************************************************************/
// import area

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

import InputDialog from './../components/InputDialog'

/******************************************************************************/
// variables area

function mapStateToProps(state) {
    const { global } = state

    return {
        version: global.version,
        url: global.url
    }
}

class Inactive extends Component {
    constructor(props) {
        super(props)

        this.className = this.constructor.name
        this.wrapper = React.createRef();
        this.state = {
            showUrlModal: false,
            nameField: '',
            urlField: ''
        }
    }

    onScanCode = (event) => {
        console.log(`[${this.className}] onScanCode`)
    }

    onAddUrl = () => {
        this.setState((prevState, props) => ({
            showUrlModal: true
        }));
    }

    closeUrl = () => {
        this.setState((prevState, props) => ({
            nameField: '',
            urlField: '',
            showUrlModal: false
        }));
    }

    onInputChange = (event) => {
        const id = event.currentTarget.id
        const value = event.currentTarget.value

        this.setState((prevState, props) => ({
            [id]: value
        }));
    }

    onConnectWithHost = (host) => {
        console.log(`[${this.className}] send data to host`)
        console.log(`[${this.className}] name: ${this.state.nameField}, host: ${this.state.urlField}`);

        // trigger register call

        this.setState((prevState, props) => ({
            nameField: '',
            urlField: '',
            showUrlModal: false
        }));
    }

    render() {
        return (
            <div className='inactive'>
                <Typography align='center' className='title'>
                    You are not connected to an active session
                </Typography>
                
                <Typography className='subtitle' align='center'>
                    join via
                </Typography>

                <Grid container className='options' spacing={1} justify='center'>
                    <Grid item xs={2}><div className='qr-icon' onClick={this.onScanCode}/></Grid>
                    
                    <Grid item xs={2}><Typography className='' align='center'>or</Typography></Grid>

                    {/* popup for URL*/}
                    <Grid item xs={2}><Link onClick={this.onAddUrl} color='secondary' underline='none'>URL</Link></Grid>
                </Grid>

                <InputDialog
                    isOpen={this.state.showUrlModal}
                    dialogId='urlDialog'
                    title='Join session'
                    acceptLabel='Connect'
                    handleAccept={this.onConnectWithHost}
                    closeLabel='Cancel'
                    handleClose={this.closeUrl}
                    ref={this.wrapper}
                >
                    <form autoComplete='off'>
                        <TextField
                            autoFocus
                            id='nameField'
                            type="text"
                            className='input'
                            margin='dense'
                            color='secondary'
                            label='Your name'
                            value={this.state['nameField']}
                            onChange={this.onInputChange}
                            fullWidth
                        />
                        
                        <TextField
                            id='urlField'
                            type="text"
                            className='input'
                            margin='dense'
                            color='secondary'
                            label='Host Url'
                            value={this.state['urlField']}
                            onChange={this.onInputChange}
                            fullWidth
                        />
                    </form>
                </InputDialog>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Inactive)