import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import Remaining from "./remaining";
import Chooser from "./chooser";
import SleepShutdownButtons from "./sleepShutdownButtons";

import TimerFacade from "../core/nanotimerTimer";
import RendererThreadSignaler from "../core/rendererThreadSignaler";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = theme => ({
  layout: {},
  paper: {}
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenMilliseconds: 3600000,
      shouldSleep: true
    };
    this.handleOnChosen = this.handleOnChosen.bind(this);
    this.handleOnFinished = this.handleOnFinished.bind(this);
    this.handleOnModeChanged = this.handleOnModeChanged.bind(this);
  }
  render() {
    let theme = createMuiTheme({
      palette: {
        type: "dark"
      }
    });

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ textAlign: "center", padding: "24px 12px 0 12px" }}>
            <SleepShutdownButtons onModeChanged={this.handleOnModeChanged} />
            <div>
              <Chooser
                onChosen={this.handleOnChosen}
                chosenMilliseconds={this.state.chosenMilliseconds}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Remaining
                allottedMilliseconds={this.state.chosenMilliseconds}
                onFinished={this.handleOnFinished}
                timer={this.props.timer}
              />
            </div>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }

  handleOnChosen(chosenMilliseconds) {
    this.setState({ chosenMilliseconds: chosenMilliseconds });
  }
  handleOnFinished() {
    var shouldSleep = this.state.shouldSleep;
    if (shouldSleep) {
      this.props.signaler.sleep();
    } else {
      this.props.signaler.shutdown();
    }
  }
  handleOnModeChanged(shouldSleep) {
    this.setState({
      shouldSleep: shouldSleep
    });
  }
}

Main.defaultProps = {
  timer: new TimerFacade(),
  signaler: new RendererThreadSignaler()
};

export default Main;