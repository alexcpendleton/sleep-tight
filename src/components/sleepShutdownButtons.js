import React, { Component } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

class SleepShutdownButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleep: true
    };
    this.triggerModeChange = this.triggerModeChange.bind(this);
    this.shutdownChosen = this.shutdownChosen.bind(this);
    this.sleepChosen = this.sleepChosen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    const selected = this.state.sleep ? "sleep" : "shutdown";
    const style = Object.assign(
      {},
      {
        background: "transparent",
        borderRadius: 0,
        border: 0,
        boxShadow: "none"
      },
      this.props.style || {}
    );
    return (
      <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={this.handleChange}
        style={style}
      >
        <ToggleButton value="shutdown">Shut Down</ToggleButton>
        <ToggleButton value="sleep">Sleep</ToggleButton>
      </ToggleButtonGroup>
    );
  }
  shutdownChosen() {
    if (!this.state.sleep) return;
    this.setState({ sleep: false }, this.triggerModeChange);
  }
  sleepChosen() {
    if (this.state.sleep) return;
    this.setState({ sleep: true }, this.triggerModeChange);
  }
  handleChange(event, newValue) {
    if (newValue === "shutdown") {
      return this.shutdownChosen();
    }
    this.sleepChosen();
  }
  triggerModeChange() {
    this.props.onModeChanged(this.state.sleep);
  }
}
SleepShutdownButtons.defaultProps = {
  onModeChanged: () => {}
};

export default SleepShutdownButtons;
