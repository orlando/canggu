import React from 'react';
import { Router, Route } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './app';


let store = createStore(reducers);

class Root extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <App />
      </Provider>
    );
  }
};

export const routes = (
  <Route name="app" path="/" component={ Root }>
  </Route>
);
