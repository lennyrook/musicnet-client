/******************************************************************************/
// import area

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {
    Router,
    Switch,
    Route
} from "react-router-dom";

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';


// utils
import store from '../../store/store'
import history from './../../data/utils/history'
import types from './../../store/global/types'
import router from './../../store/router/types'

// views
import Loader from '../components/Loader'

import Header from './Header'
import Footer from './Footer'
import Inactive from './Inactive'
import Active from './Active'


/******************************************************************************/
// variables area

const action = type => store.dispatch({type})

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

class App extends Component {
    constructor(props) {
        super(props)

        this.className = this.constructor.name
    }

    componentDidMount() {
        action(types.INIT_APPLICATION)
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <ThemeProvider theme={darkTheme}>
                        <div className='App'>
                            <Header />

                            <Grid className='grid' container spacing={2} justify='center'>
                                <Switch>
                                    <Route exact path="/">
                                        <Grid item xs={11} md={4} lg={4}>default</Grid>
                                    </Route>
                                    
                                    <Route path={`/${router.PAGE_LOADING}`}>
                                        <Grid item xs={11} md={4} lg={4} className='centered-wrapper'><Loader title='Initialising Application' /></Grid>
                                    </Route>
                                    
                                    <Route path={`/${router.PAGE_ACTIVE}`}>
                                        <Grid item xs={11} md={4} lg={4} className='centered-wrapper'><Inactive className='' /></Grid>
                                    </Route>
                                    
                                    <Route path={`/${router.PAGE_INACTIVE}`}>
                                        <Grid item xs={10} md={4} lg={4}><Active className='' /></Grid>
                                    </Route>
                                </Switch>
                            </Grid>

                            <Footer />
                        </div>
                    </ThemeProvider>
                </Router>
            </Provider>
        )
    }
}

export default App;
