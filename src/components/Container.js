import React from 'react';
import classNames from 'classNames';


export class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let state = this.props.data.state;
    let stateClass = classNames({
      'container-state': true,
      [`container-state-${state}`]: true
    });

    return (
      <li className="container">
        <div className={ stateClass }>
        </div>
        <div className="container-info">
          <span className="name">{ this.props.data.name } </span>
          <span className="image">{ this.props.data.image } </span>
        </div>
      </li>
    );
  }
}

Container.propTypes = {
  data: React.PropTypes.object.isRequired,
};
