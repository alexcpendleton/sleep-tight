import React, { Component } from "react";
import ReactDOM from "react-dom";

import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Slider from "material-ui/Slider";

import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import AvPause from "material-ui/svg-icons/av/pause.js";
import AvPlayArrow from "material-ui/svg-icons/av/play-arrow.js";
import AvReplay from "material-ui/svg-icons/av/replay.js";

import _ from "lodash";
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

class Remaining extends Component {
  constructor(props) {
    super(props);
    this.internalTimer = {
      startNew: opts => {
        this.props.timer.startNew(opts);
      },
      onTick: ms => {
        this.props.timer.onTick(ms);
      },
      stopActive: () => {
        this.props.timer.stopActive();
      }
    };
    this.state = {
      allottedMilliseconds: props.allottedMilliseconds || 0,
      remainingMilliseconds: props.allottedMilliseconds || 0,
      started: false
    };

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
    this.renderStateMilliseconds = this.renderStateMilliseconds.bind(this);
    this.finish = this.finish.bind(this);
    this.tick = this.tick.bind(this);
    this.hasFreshAllottedMilliseconds = this.hasFreshAllottedMilliseconds.bind(
      this
    );
  }
  componentWillReceiveProps(newProps) {
    this.initiateStartFromNewPropsIfNecessary(newProps);
  }
  hasFreshAllottedMilliseconds(props) {
    if (props.allottedMilliseconds === undefined) return false;
    if (props.allottedMilliseconds <= 0) return false;
    if (props.allottedMilliseconds != this.state.allottedMilliseconds) {
      return true;
    }
    return false;
  }

  initiateStartFromNewPropsIfNecessary(newProps) {
    if (this.hasFreshAllottedMilliseconds(newProps)) {
      this.setState(
        {
          allottedMilliseconds: newProps.allottedMilliseconds,
          remainingMilliseconds: newProps.allottedMilliseconds
        },
        () => this.start()
      );
    }
  }
  tick(milliseconds) {
    this.setState({
      remainingMilliseconds: milliseconds
    });
  }
  start() {
    var remaining = this.state.remainingMilliseconds;
    if (remaining == 0) {
      remaining = this.state.allottedMilliseconds;
    }
    this.setState({
      remainingMilliseconds: remaining,
      started: true
    });
    this.internalTimer.startNew({
      callback: this.finish,
      milliseconds: remaining,
      tickInterval: 1000,
      onTick: this.tick
    });
  }
  pause() {
    this.setState({
      started: false
    });
    this.internalTimer.stopActive();
  }
  restart() {
    this.pause();
    this.setState(
      {
        remainingMilliseconds: this.state.allottedMilliseconds
      },
      () => {
        this.start();
      }
    );
  }
  finish() {
    this.setState({
      started: false
    });
    this.props.onFinished();
  }
  parsePad(i) {
    return _.padStart(parseInt(i), 2, "0");
  }
  renderMilliseconds(milliseconds) {
    var seconds = this.parsePad((milliseconds / 1000) % 60);
    var minutes = this.parsePad((milliseconds / (1000 * 60)) % 60);
    var hours = this.parsePad((milliseconds / (1000 * 60 * 60)) % 24);
    return `${hours}:${minutes}:${seconds}`;
  }
  renderStateMilliseconds() {
    return this.renderMilliseconds(this.state.remainingMilliseconds);
  }
  render() {
    return (
      <div>
        <div id="remainingTime">{this.renderStateMilliseconds()}</div>
        <div>
          {this.state.started ? (
            <IconButton id="pause" tooltip="Pause" onClick={this.pause}>
              <AvPause />
            </IconButton>
          ) : (
            <IconButton id="start" tooltip="Start" onClick={this.start}>
              <AvPlayArrow />
            </IconButton>
          )}
          <IconButton id="restart" tooltip="Restart" onClick={this.restart}>
            <AvReplay />
          </IconButton>
        </div>
      </div>
    );
  }
}

Remaining.defaultProps = {
  onFinished: () => {}
};

export default Remaining;
