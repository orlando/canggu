import React from 'react';
import { Router, Route } from 'react-router';
import { Header, Containers, ContainerStats } from './components';


class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main className="main">
          <Containers />
          <ContainerStats />
        </main>
      </div>
    );
  }
};

export const routes = (
  <Route name="app" path="/" component={App}>
  </Route>
);
