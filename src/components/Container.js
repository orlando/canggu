import React from 'react';
import classNames from 'classNames';
import { connect } from 'react-redux';
import { docker } from '../utils/Docker';


class ContainerComponent extends React.Component {
  props: {
    data: Object
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onStatsTick = this.onStatsTick.bind(this);

  }

  onClick() {
    const { data }  = this.props;
    this.props.selectContainer(data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedContainer.id === this.props.data.id) {
      this.fetchStats();
    } else {
      this.stopFetchStats();
    }
  }

  fetchStats() {
    docker.containerStats(this.props.data.id, (err, stream) => {
      if (err || !stream) {
        return;
      }

      this.setState({
        statsStream: stream
      });

      stream.on('data', this.onStatsTick)
    });
  }

  onStatsTick(data) {
    this.props.statsTick(this.props.data.id, data);
  }

  stopFetchStats() {
    let stream = this.state.statsStream;

    if (stream) {
      stream.destroy();
    }
  }

  render() {
    let state = this.props.data.state;
    let stateClass = classNames({
      'container-state': true,
      [`container-state-${state}`]: true
    });

    const selectedContainer = this.props.selectedContainer;
    let containerClass = classNames({
      'container': true,
      'container--selected': selectedContainer.id === this.props.data.id
    })

    return (
      <li className={ containerClass } onClick={ this.onClick }>
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


const select = (state) => {
  return {
    selectedContainer: state.selectedContainer
  };
}

const actions = (dispatch) => {
  return {
    statsTick: (id, data) => {
      dispatch({
        type: 'CONTAINER_STATS_TICK',
        payload: {
          id: id,
          data
        }
      });
    },
    selectContainer: (data) => {
      dispatch({
        type: 'CONTAINER_SELECTED',
        payload: {
          ...data
        }
      });
    }
  };
}

export const Container = connect(select, actions)(ContainerComponent);
