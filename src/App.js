import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './containers'
import './App.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
        <Fragment>
          <Provider store={store}>
            <Home/>
          </Provider>
        </Fragment>
    </BrowserRouter>
  </div>
);

export default App;