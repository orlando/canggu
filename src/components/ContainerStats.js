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

    let theme = {
      lineTension: 0.5,
      backgroundColor: "rgba(34, 184, 235, 0.4)",
      borderColor: "rgba(34, 184, 235, 0.4)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(16, 15, 42, 1)",
      pointBackgroundColor: "rgba(16, 15, 42, 1)",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
    };

    let cpuStatsData = this.props.stats.map((tick) => {
      return (tick.cpu_stats.cpu_usage.total_usage / toPercent).toFixed(3);
    });

    let memoryStatsData = this.props.stats.map((tick) => {
      return (tick.memory_stats.usage * 1e-6).toFixed(3);
    });

    let pidStatsData = this.props.stats.map((tick) => {
      return tick.pids_stats.current;
    });

    this.setState({
      cpuStats: {
        labels: labels,
        datasets: [{
          ...theme,
          label: 'CPU Stats',
          data: cpuStatsData
        }]
      },
      memoryStats: {
        labels: labels,
        datasets: [{
          ...theme,
          label: 'Memory Stats',
          data: memoryStatsData
        }]
      },
      pidStats: {
        labels: labels,
        datasets: [{
          ...theme,
          label: 'PID Stats',
          data: pidStatsData
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
    const lineChartOptions = {
      animation : false,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
          }
        }],
        xAxes: [{
          display: false
        }]
      }
    };

    if (!this.state.cpuStats.labels) {
      return null;
    }

    return (
      <div className="stats">
        <div className="stat">
          <header className="stat-header">
            <h3>CPU (%)</h3>
          </header>
          <div className="stat-body">
            <Line data={ this.state.cpuStats } options={ lineChartOptions } />
          </div>
        </div>
        <div className="stat">
          <header className="stat-header">
            <h3>Memory (MB)</h3>
          </header>
          <div className="stat-body">
            <Line data={ this.state.memoryStats } options={ lineChartOptions } />
          </div>
        </div>
        <div className="stat">
          <header className="stat-header">
            <h3>PID</h3>
          </header>
          <div className="stat-body">
            <Line data={ this.state.pidStats } options={ lineChartOptions } />
          </div>
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
