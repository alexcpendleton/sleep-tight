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
    this.triggerChange = this.triggerChange.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  updateTip(event) {
    const target = event.target;
    const mousePosition = event.clientX;
    const sliderWidth = target.clientWidth;
    const mousePositionWithinSlider = mousePosition - target.offsetLeft;
    let percentage = mousePositionWithinSlider / sliderWidth;
    if (percentage > 100) {
      percentage = 100;
    } else if (percentage < 0) {
      percentage = 0;
    }
    const step = this.state.step;
    const max = parseInt(target.getAttribute("max"), 10);
    let pos = max * percentage;
    if (pos > max) {
      pos = max;
    }
    const formatted = formatMilliseconds(pos);
    let tipX = mousePosition;
    let tipWidth = this.props.tipWidth;

    let something = sliderWidth - tipWidth;

    if (tipX > something) {
      tipX = sliderWidth - tipWidth;
    } else if (tipX < event.target.offsetLeft) {
      tipX = 0;
    }
    this.setState({
      tip: formatted,
      showTip: true,
      tipX: tipX
    });
    return pos;
  }
  handleMouseMove(event) {
    this.updateTip(event);
  }
  handleMouseOut(event) {
    1;
    this.setState({
      showTip: false,
      tip: "0:00:00"
    });
  }
  renderTip() {
    const textStyle = {
      visibility: this.state.showTip ? "" : "hidden",
      position: "absolute",
      left: this.state.tipX,
      background: "#212121",
      zIndex: "-1",
      padding: "5px 10px"
    };
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "30px"
        }}
      >
        <Typography color="textSecondary" style={textStyle}>
          {this.state.tip}
        </Typography>
      </div>
    );
  }
  render() {
    const max = this.state.maxMilliseconds;
    return (
      <div>
        {this.renderTip()}
        <input
          type="range"
          min="0"
          max={max}
          value={this.state.chosenMilliseconds}
          step={this.state.step}
          onChange={this.triggerChange}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseOut}
          style={{ width: "100%", margin: 0 }}
        />
      </div>
    );
  }
  triggerChange(event, newValue) {
    console.log("triggerChange", event, newValue, event.target.value);
    if (!newValue) {
      newValue = event.target.value;
      if (newValue <= 1000) {
        newValue = 1000;
      }
    }
    if (!this.props.onChosen) return;
    this.setState({
      chosenMilliseconds: newValue
    });
    this.props.onChosen(newValue);
  }
}

Chooser.defaultProps = {
  onChosen: ms => {},
  tipWidth: 66
};
export default Chooser;
