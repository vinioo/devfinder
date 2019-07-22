import React, { Component } from 'react';

import { Provider } from 'react-redux';


import './config/reactotron';
import Map from './components/Map';
import store from './store';

import './App.css'

class App extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <Map />
        </Provider>
      </>
    );
  }
}
export default App;
