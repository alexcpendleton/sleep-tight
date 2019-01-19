import React, { Component } from "react";
import ReactDOM from "react-dom";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AvPause from "@material-ui/icons/pause";
import AvPlayArrow from "@material-ui/icons/PlayArrow";
import AvReplay from "@material-ui/icons/replay";
import { formatMilliseconds } from "../core/time";

class Remaining extends Component {
  constructor(props, context) {
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
    this.renderPlaybackButton = this.renderPlaybackButton.bind(this);
    this.finish = this.finish.bind(this);
    this.tick = this.tick.bind(this);
    this.hasFreshAllottedMilliseconds = this.hasFreshAllottedMilliseconds.bind(
      this
    );
    this.height = "24px";
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
    if (props.started) return true;
    return false;
  }

  initiateStartFromNewPropsIfNecessary(newProps) {
    if (this.hasFreshAllottedMilliseconds(newProps)) {
      this.setState(
        {
          allottedMilliseconds: newProps.allottedMilliseconds,
          remainingMilliseconds: newProps.allottedMilliseconds
        },
        () => {
          // Prevents going to sleep when dragged to the
          // beginning but not yet released
          if (newProps.started) {
            this.start();
          } else {
            this.pause();
          }
        }
      );
    }
  }
  tick(milliseconds) {
    this.setState({
      remainingMilliseconds: milliseconds
    });
  }
  start() {
    let remaining = this.state.remainingMilliseconds;
    if (remaining === 0) {
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
    this.setState(
      {
        remainingMilliseconds: this.state.allottedMilliseconds,
        started: false
      },
      () => {
        this.pause();
        this.props.onFinished();
      }
    );
  }
  renderStateMilliseconds() {
    return (
      <span
        style={{
          display: "inline-block",
          height: this.height,
          lineHeight: this.height
        }}
      >
        {formatMilliseconds(this.state.remainingMilliseconds)}
      </span>
    );
  }
  render() {
    const buttonStyle = {
      color: this.props.theme.palette.text.secondary,
      height: this.height,
      width: this.height
    };
    const iconStyle = {
      height: this.height,
      width: this.height,
      margin: "0",
      padding: "0",
      position: "absolute"
    };
    return (
      <div style={{ marginTop: "5px" }}>
        <Typography
          color="textSecondary"
          style={{
            padding: "0",
            margin: "0",
            position: "relative",
            width: "80px",
            margin: "0 auto",
            height: this.height,
            whiteSpace: "nowrap"
          }}
        >
          {this.renderPlaybackButton(buttonStyle, iconStyle)}
          {this.renderStateMilliseconds()}
          {this.renderRestartButton(buttonStyle, iconStyle)}
        </Typography>
      </div>
    );
  }
  renderRestartButton(buttonStyle, iconStyle) {
    const disabled =
      this.state.started ||
      this.state.remainingMilliseconds === this.state.allottedMilliseconds;
    const containerStyle = {
      position: "absolute",
      right: "-30px",
      top: "0",
      display: "inline-block"
    };
    const button = (
      <IconButton
        id="restart"
        tooltip="Restart"
        onClick={this.restart}
        style={buttonStyle}
      >
        <AvReplay style={iconStyle} />
      </IconButton>
    );
    return <span style={containerStyle}>{button}</span>;
  }
  renderPlaybackButton(buttonStyle, iconStyle) {
    const isStarted = this.state.started;
    let button;
    if (isStarted) {
      button = (
        <IconButton
          id="pause"
          tooltip="Pause"
          onClick={this.pause}
          style={buttonStyle}
        >
          <AvPause style={iconStyle} />
        </IconButton>
      );
    } else {
      button = (
        <IconButton
          id="start"
          tooltip="Start"
          onClick={this.start}
          style={buttonStyle}
        >
          <AvPlayArrow style={iconStyle} />
        </IconButton>
      );
    }
    const containerStyle = {
      position: "absolute",
      left: "-30px",
      top: "0",
      display: "inline-block"
    };
    return <span style={containerStyle}>{button}</span>;
  }
}

Remaining.defaultProps = {
  onFinished: () => {}
};

export default Remaining;
