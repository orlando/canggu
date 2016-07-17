import React from 'react';
import { Container } from './Container';
import { connect } from 'react-redux';


class Containers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let containers = this.props.containers.map((container) => {
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

function select(state) {
  return {
    containers: state.containers
  };
}

export const ContainerList = connect(select, null)(Containers);
