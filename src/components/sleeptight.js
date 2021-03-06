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
      shouldSleep: true,
      isDragging: false
    };
    this.handleOnChosen = this.handleOnChosen.bind(this);
    this.handleOnDrag = this.handleOnDrag.bind(this);
    this.handleOnFinished = this.handleOnFinished.bind(this);
    this.handleOnModeChanged = this.handleOnModeChanged.bind(this);
  }
  render() {
    const theme = createMuiTheme({
      palette: {
        type: "dark",
        primary: {
          main: "#dcdcaa",
          contrastText: "#dcdcaa"
        },
        secondary: {
          main: "#dcdcaa",
          contrastText: "#dcdcaa"
        }
      }
    });

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div
            style={{
              textAlign: "center",
              padding: "24px 12px 0 12px",
              width: 280,
              height: 100
            }}
          >
            <SleepShutdownButtons
              style={{ display: "none" }}
              onModeChanged={this.handleOnModeChanged}
            />
            <div style={{}}>
              <Chooser
                onDrag={this.handleOnDrag}
                onChosen={this.handleOnChosen}
                chosenMilliseconds={this.state.chosenMilliseconds}
                theme={theme}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Remaining
                allottedMilliseconds={this.state.chosenMilliseconds}
                onFinished={this.handleOnFinished}
                timer={this.props.timer}
                theme={theme}
                started={!this.state.isDragging}
              />
            </div>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }

  handleOnDrag(chosenMilliseconds) {
    this.setState({ chosenMilliseconds, isDragging: true });
  }
  handleOnChosen(chosenMilliseconds) {
    this.setState({
      chosenMilliseconds,
      isDragging: false
    });
  }
  handleOnFinished() {
    if (this.state.isDragging) return;
    const shouldSleep = this.state.shouldSleep;
    if (shouldSleep) {
      this.props.signaler.sleep();
    } else {
      this.props.signaler.shutdown();
    }
  }
  handleOnModeChanged(shouldSleep) {
    this.setState({
      shouldSleep
    });
  }
}

Main.defaultProps = {
  timer: new TimerFacade(),
  signaler: new RendererThreadSignaler()
};

export default Main;
