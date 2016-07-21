import React from 'react';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxStreams from 'redux-streams';
import reducers from './reducers';
import App from './app';


const store = createStore(
  reducers,
  applyMiddleware(reduxStreams)
);

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
