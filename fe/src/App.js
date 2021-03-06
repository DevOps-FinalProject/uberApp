import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Appbar from './components/Appbar.js';
import './App.css';

require('dotenv').config()

// routing: https://reactrouter.com/web/api/Hooks
// a2hs: https://dev.to/zvakh/a2hs-how-to-add-the-pwa-to-home-screen-27c4

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Appbar />
      </React.Fragment>
    );
  }
}

export default App; 
