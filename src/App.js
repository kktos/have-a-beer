/*
  the main App
  - defining the main layout
  - defining the routes
  - handling the loader icon (showed when loading)
 */

import React from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';
import browserHistory from 'react-router/lib/browserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';

import './helpers/express';
import './helpers/beerStore';
import BeerTable from './BeerTable';
import BeerDetails from './BeerDetails';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= { isLoading: false };
    /*
     routes are defined here and not in render to avoid the warning "You cannot change <Router routes>; it will be ignored"
     The beers route is having a parm to handle the change of the loader icon so the route is kinda changing the router
     as it changes the state thus forcing a new rendering thus recreating the routes...
    */
    this.routes= (
          <Router history={browserHistory}>
            <Route path="/beers" component={BeerTable} onLoad={state=>this.handleLoad(state)} />
            <Route path="/beers/:id" component={BeerDetails} />
            <Redirect from="/" to="/beers" />
          </Router>         
    );
  }

  handleLoad(loadingState) {
    this.setState({isLoading: loadingState});
  }

  showLoadProgress() {
      return this.state.isLoading ?
        <CircularProgress color="red" size={30} thickness={4} style={{ margin: 8 }} />
        :
        <span />
  }

  render() {
    return <MuiThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar title="Have A Beer" iconElementRight={ this.showLoadProgress() } style={{ position:'fixed' }} />
        <div className="body" style={{ marginTop:'64px', display: 'flex', flex: '1', backgroundColor: '#edecec' }}>
          { this.routes }
        </div>
      </div>
    </MuiThemeProvider>       
  }
}

export default App;
