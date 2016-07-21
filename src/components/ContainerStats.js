import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs';


class ContainerStatsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cpuStats: {}
    };

  }
  componentWillReceiveProps() {
    if (this.props.selectedContainer.id) {
      this.prepareData();
    }
  }

  prepareData() {
    const toPercent = 10000000000;
    let labels = this.props.stats.map((tick) => {
      return '';
    });

    let cpuStatsData = this.props.stats.map((tick) => {
      return (tick.cpu_stats.cpu_usage.total_usage / toPercent).toFixed(3);
    });

    let memoryStatsData = this.props.stats.map((tick) => {
      return (tick.memory_stats.usage * 1e-6).toFixed(3);
    });

    this.setState({
      cpuStats: {
        labels: labels,
        datasets: [{
          label: 'CPU Stats',
          data: cpuStatsData
        }]
      },
      memoryStats: {
        labels: labels,
        datasets: [{
          label: 'Memory Stats',
          data: memoryStatsData
        }]
      }
    });
  }

  render() {
    return (
      <div className="container-stats">
        <h4>Container Stats</h4>
          { this.renderCharts() }
      </div>
    );
  }

  renderCharts() {
    var lineChartOptions = {
      animation : false,
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
          }
        }]
      }
    };

    if (!this.state.cpuStats.labels) {
      return null;
    }

    return (
      <div className="stats">
        <div className="stat">
          <Line data={ this.state.cpuStats } options={ lineChartOptions } />
        </div>
        <div className="stat">
          <Line data={ this.state.memoryStats } options={ lineChartOptions } />
        </div>
      </div>
    );
  }
}

const select = (state) => {
  return {
    selectedContainer: state.selectedContainer,
    stats: state.stats
  }
};

export const ContainerStats = connect(select, null)(ContainerStatsComponent);
