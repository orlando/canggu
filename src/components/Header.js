import React from 'react';
import electron from 'electron';
import classNames from 'classnames';
const remote = electron.remote;

const isWindows = process.platform === 'win32';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false
    };
  }

  handleClose() {
    remote.getCurrentWindow().close();
  }

  handleMinimize() {
    remote.getCurrentWindow().minimize();
  }

  handleFullscreen() {
    if (isWindows) {
      if (remote.getCurrentWindow().isMaximized()) {
        remote.getCurrentWindow().unmaximize();
      } else {
        remote.getCurrentWindow().maximize();
      }
      this.setState({
        fullscreen: remote.getCurrentWindow().isMaximized()
      });
    } else {
      remote.getCurrentWindow().setFullScreen(!remote.getCurrentWindow().isFullScreen());
      this.setState({
        fullscreen: remote.getCurrentWindow().isFullScreen()
      });
    }
  }

  renderWindowButtons() {
    let buttons;

    if (isWindows) {
      buttons = (
        <div className="windows-buttons">
        <div className="windows-button button-minimize enabled" onClick={this.handleMinimize}><div className="icon"></div></div>
        <div className={`windows-button ${this.state.fullscreen ? 'button-fullscreenclose' : 'button-fullscreen'} enabled`} onClick={this.handleFullscreen}><div className="icon"></div></div>
        <div className="windows-button button-close enabled" onClick={this.handleClose}></div>
        </div>
      );
    } else {
      buttons = (
        <div className="buttons">
        <div className="button button-close enabled" onClick={this.handleClose}></div>
        <div className="button button-minimize enabled" onClick={this.handleMinimize}></div>
        <div className="button button-fullscreen enabled" onClick={this.handleFullscreen}></div>
        </div>
      );
    }

    return buttons;
  }

  renderBasicHeader() {
    let headerClasses = classNames({
      bordered: !this.props.hideLogin,
      'main-header': true,
      'no-drag': true
    });

    return (
      <div className={headerClasses}>
        <div className="left-header">
          {isWindows ? null : this.renderWindowButtons()}
        </div>
        <div className="right-header">
          {isWindows ? this.renderWindowButtons() : null}
        </div>
      </div>
    );
  }

  render() {
    return this.renderBasicHeader();
  }
}
