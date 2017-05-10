import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class SleepShutdownButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleep: true
    };
    this.triggerModeChange = this.triggerModeChange.bind(this);
    this.shutdownChosen = this.shutdownChosen.bind(this);
    this.sleepChosen = this.sleepChosen.bind(this);
  }
  render() {
    return (
      <div>
        <RaisedButton label="Shut Down" id="shutdown" primary={!this.state.sleep} 
          onTouchTap={this.shutdownChosen}/>
        <RaisedButton label="Sleep" id="sleep" primary={this.state.sleep} 
          onTouchTap={this.sleepChosen}/>
      </div>
    )
  }
  shutdownChosen() {
    if(!this.state.sleep) return;
    this.setState({ sleep:false }, this.triggerModeChange);
  }
  sleepChosen() {
    if(this.state.sleep) return;
    this.setState({ sleep:true }, this.triggerModeChange);
  }
  triggerModeChange(){
    this.props.onModeChanged(this.state.sleep);
  }
};
SleepShutdownButtons.defaultProps = {
  onModeChanged:()=>{}
};

export default SleepShutdownButtons;
