import React from 'react';
import { docker } from './utils/Docker';
import { Header, ContainerList, ContainerStats } from './components';
import { connect } from 'react-redux';


class App extends React.Component {
  componentDidMount() {
    this.fetchContainers();
  }

  fetchContainers() {
    docker.fetchAllContainers((err, containers) => {
      const parsedContainers = containers.map((container) => {
        return {
          id: container.Id,
          name: container.Names[0].replace('/',''),
          image: container.Image,
          state: container.State
        }
      });

      this.props.dispatch({
        type: 'FETCH_CONTAINERS',
        payload: {
          containers: parsedContainers
        }
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <main className="main">
          <ContainerList />
          <ContainerStats />
        </main>
      </div>
    );
  }
};

export default connect()(App);
