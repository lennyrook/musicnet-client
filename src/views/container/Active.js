/******************************************************************************/
// import area

import React, { Component } from 'react'
import { connect } from 'react-redux'

import types from './../../store/search/types'

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import SourceFilter from './../components/SourceFilter';
import SongList from './../components/SongList';


/******************************************************************************/
// variables area

let delayTimer = undefined

const mapStateToProps = state => {
    const { global, search } = state

    return {
        term: search.term,
        filteredResults: search.filteredResults,
        filter: search.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        action: (type, payload) => dispatch({type: type, payload: payload})
    }
}

class Active extends Component {
    constructor(props) {
        super(props)

        this.className = this.constructor.name
        this.triggerSearch = false
        this.onDelay = false 
        this.triggerDelay = 250
        this.state = {
            searchField: '',
        }
    }

    onFilterChange = (event) => {
        const name = event.currentTarget.id
        const isActive = event.currentTarget.classList.contains(types.FILTER_ACTIVE)
        const newState = isActive ? types.FILTER_INACTIVE : types.FILTER_ACTIVE

        const payload = {
            name: name,
            state: newState
        }

        this.props.action(types.FILTER_CHANGED, payload)
    }

    onInputChange = (event) => {
        const id = event.currentTarget.id
        const value = event.currentTarget.value

        this.setState((prevState, props) => ({
            [id]: value
        }));

        if(!this.onDelay && !this.triggerSearch) {
            this.onDelay = true

            delayTimer = setTimeout(() => {
                this.triggerSearch = true
                this.onDelay = false

            }, this.triggerDelay)
        }

        if(this.triggerSearch) {
            console.log(`[${this.className}] auto search with: ${value}`);
            
            this.triggerSearch = false

            this.props.action(types.SEARCH_INIT, value)
        }
    }

    onSearch = (event) => {
        let value = this.state.searchField

        if(value && value !== '') {
            console.log(`[${this.className}] trigger search with: ${value}`);
            
            this.props.action(types.SEARCH_INIT, value)
        }
    }

    onKeySearch = (event) => {
        if (event.keyCode === 13)
            this.onSearch(event)
    }

    render() {
        return (
            <div className='active-page'>
                <SourceFilter list={this.props.filter} onClick={this.onFilterChange} />

                <FormControl className=''>
                    <InputLabel htmlFor="searchField" color='secondary'>title or interpret</InputLabel>
                    <Input
                        autoFocus
                        fullWidth
                        id='searchField'
                        type='text'
                        className='input'
                        margin='dense'
                        color='secondary'
                        value={this.state['searchField']}
                        onChange={this.onInputChange}
                        onKeyUp={this.onKeySearch}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="searchIcon"
                                    onClick={this.onSearch}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <SongList list={this.props.filteredResults} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Active)