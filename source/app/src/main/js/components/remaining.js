import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Slider from 'material-ui/Slider';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AvPause from 'material-ui/svg-icons/av/pause.js';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow.js';
import AvReplay from 'material-ui/svg-icons/av/replay.js';

import TimerFacade from '../core/repeatTimer.js';

import _ from 'lodash'
import injectTapEventPlugin from 'react-tap-event-plugin'; 
injectTapEventPlugin();

class Remaining extends Component {
  constructor(props) {
    super(props);
    this.internalTimer = {
      startNew:(cb,ms)=>{ this.props.timer.startNew(cb,ms); },
      onTick:(ms)=>{ this.props.timer.onTick(ms); },
      stopActive:()=>{ this.props.timer.stopActive(); }
    };
    this.state = {
      allottedMilliseconds:0,
      remainingMilliseconds:0,
      started:false
    };

    this.props.timer.onTick = (ms)=> {
      this.tick(ms);
    };
    
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
    this.renderStateMilliseconds = this.renderStateMilliseconds.bind(this);
    this.finish = this.finish.bind(this);
    this.hasFreshAllottedMilliseconds = this.hasFreshAllottedMilliseconds.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.initiateStartFromNewPropsIfNecessary(newProps);
  }
  hasFreshAllottedMilliseconds(props) {
    if(props.allottedMilliseconds === undefined) return false;
    if(props.allottedMilliseconds <= 0) return false;
    if(props.allottedMilliseconds != this.state.allottedMilliseconds) {
      return true;
    }
    return false;
  }

  initiateStartFromNewPropsIfNecessary(newProps) {
    if(this.hasFreshAllottedMilliseconds(newProps)) {
      this.state = {
        allottedMilliseconds:newProps.allottedMilliseconds,
        remainingMilliseconds:newProps.allottedMilliseconds
      };
      this.start();
    }
  }
  tick(milliseconds) {
    this.setState({
      remainingMilliseconds: milliseconds
    });
  }
  start() {
    var remaining = this.state.remainingMilliseconds;
    if(remaining == 0) {
      remaining = this.state.allottedMilliseconds;
    }
    this.setState({
      remainingMilliseconds: remaining,
      started: true
    });
    this.internalTimer
      .startNew(this.finish, remaining);
  }
  pause() {
    this.setState({
      started: false
    });
    this.internalTimer.stopActive()
  }
  restart() {
    this.pause();
    this.setState({
      remainingMilliseconds:this.state.allottedMilliseconds
    }, ()=> {
      this.start();
    });
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
    var seconds=this.parsePad(((milliseconds/1000)%60));
    var minutes=this.parsePad(((milliseconds/(1000*60))%60));
    var hours=this.parsePad((milliseconds/(1000*60*60))%24);
    return `${hours}:${minutes}:${seconds}`;
  }
  renderStateMilliseconds() {
    return this.renderMilliseconds(this.state.remainingMilliseconds);
  }
	render() {
		return(
      <div>
        <div id="remainingTime">
          {this.renderStateMilliseconds()}
        </div>
        <div>
          {this.state.started ?
          <IconButton id="pause" 
            tooltip="Pause"
            onTouchTap={this.pause}>
            <AvPause />
          </IconButton> :
          <IconButton id="start" tooltip="Start" 
            onTouchTap={this.start}>
            <AvPlayArrow />
          </IconButton>}
          <IconButton id="restart" tooltip="Restart"
            onTouchTap={this.restart}>
            <AvReplay />
          </IconButton>
        </div>
      </div>
		)
	}
}

Remaining.defaultProps = {
  timer:new TimerFacade(),
  onFinished:()=> { }
};

export default Remaining;
