import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Slider from 'material-ui/Slider';

import _ from 'lodash'

class Chooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxMilliseconds: 7200000
    };
    this.triggerChange = this.triggerChange.bind(this);
    this._onDragStop = this._onDragStop.bind(this);
    this._onChange = this._onChange.bind(this);
    this._selectionConcluded = false;
  }
	render() {
		return(
      <div>
        <Slider 
          min={0}
          max={this.state.maxMilliseconds}
          step={1000}
          value={this.state.chosenMilliseconds}
          onDragStop={this._onDragStop}
          onChange={this._onChange}
         />
      </div>
		)
	}
  triggerChange(event, newValue) {
    this.props.onChosen(newValue);
  }
  _onChange(event, newValue) {
    this.setState({
      chosenMilliseconds:newValue
    });
  }
  _onDragStop(event) {
    //console.log("_onDragStop");
    this.triggerChange(event, this.state.chosenMilliseconds);
  }
}

Chooser.defaultProps = {
  onChosen:(ms)=>{}
};
export default Chooser;
