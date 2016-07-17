import React from 'react';
import { docker } from '../utils/Docker';
import { Container } from './Container';


export class Containers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: []
    };
  }

  componentDidMount() {
    docker.fetchAllContainers((err, containers) => {
      const parsedContainers = containers.map((container) => {
        return {
          id: container.Id,
          name: container.Names[0].replace('/',''),
          image: container.Image,
          state: container.State
        }
      });

      this.setState({containers: parsedContainers});
    })
  }

  render() {
    let containers = this.state.containers.map((container) => {
      return (
        <Container key={container.id} data={container} />
      );
    });

    return (
      <div className="sidebar">
        <header className="sidebar-header">
          <h4>Containers</h4>
        </header>
        <div className="containers">
        <ul>
          { containers }
        </ul>
        </div>
      </div>
    );
  }
}
