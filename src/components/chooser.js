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
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.triggerHandlerWithMinValue = this.triggerHandlerWithMinValue.bind(
      this
    );
  }
  updateTip(event) {
    return;
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
    this.setState({
      showTip: false,
      tip: "0:00:00"
    });
  }
  renderTip() {
    return ""; // temporarily(?) disabled
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
          onChange={this.handleDrag}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseOut}
          onMouseUp={this.handleMouseUp}
          style={{ width: "100%", margin: 0 }}
        />
      </div>
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
