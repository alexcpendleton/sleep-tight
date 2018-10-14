import React, { Component } from "react";
import ReactDOM from "react-dom";

import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";
import { formatMilliseconds } from "../core/time";
class Chooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxMilliseconds: 7200000,
      chosenMilliseconds: props.chosenMilliseconds || 0,
      step: 1000,
      tip: "0",
      showTip: false
    };
    this.handleDrag = this.handleDrag.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.triggerHandlerWithMinValue = this.triggerHandlerWithMinValue.bind(
      this
    );
  }
  render() {
    return this.renderHtmlRangeSlider();
  }
  renderHtmlRangeSlider() {
    const max = this.state.maxMilliseconds;
    const theme = this.props.theme;
    const ticksId = "ticks";
    return (
      <React.Fragment>
        {this.renderTicksDatalist(ticksId)}
        <input
          type="range"
          min="0"
          max={max}
          value={this.state.chosenMilliseconds}
          step={this.state.step}
          onChange={this.handleDrag}
          onMouseUp={this.handleMouseUp}
          style={{
            width: "100%",
            margin: 0
          }}
          list={ticksId}
        />
      </React.Fragment>
    );
  }
  renderTicksDatalist(id) {
    // put a tick mark at every ten minutes
    const interval = 600000; // 600000=10 min
    const ticks = [];
    const max = this.state.maxMilliseconds;
    for (let i = interval; i < max; i += interval) {
      ticks.push(i);
    }
    return (
      <datalist id={id}>
        {ticks.map(i => (
          <option key={i} value={i} label={formatMilliseconds(i)} />
        ))}
      </datalist>
    );
  }
  triggerHandlerWithMinValue(event, newValue, handler) {
    if (!handler) return;
    if (!newValue) {
      newValue = event.target.value;
      if (newValue <= 1000) {
        newValue = 1000;
      }
    }
    this.setState({
      chosenMilliseconds: newValue
    });
    handler(newValue);
  }
  handleDrag(event, newValue) {
    this.triggerHandlerWithMinValue(event, newValue, this.props.onDrag);
  }
  handleMouseUp(event, newValue) {
    this.triggerHandlerWithMinValue(event, newValue, this.props.onChosen);
  }
}

Chooser.defaultProps = {
  onChosen: ms => {},
  tipWidth: 66
};
export default Chooser;
