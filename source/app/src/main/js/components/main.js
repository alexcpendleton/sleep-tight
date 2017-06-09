import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AvPause from 'material-ui/svg-icons/av/pause.js';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow.js';
import AvReplay from 'material-ui/svg-icons/av/replay.js';

import Remaining from './remaining'
import Chooser from './chooser'
import SleepShutdownButtons from './sleepShutdownButtons'

import TimerFacade from '../core/NanoTimerTimer'
import RendererThreadSignaler from '../core/RendererThreadSignaler'

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chosenMilliseconds: 3600000,
			shouldSleep: true,
		};
		this.handleOnChosen = this.handleOnChosen.bind(this);
		this.handleOnFinished = this.handleOnFinished.bind(this);
		this.handleOnModeChanged = this.handleOnModeChanged.bind(this);
	}
	render() {
		// Note to self, don't forget to run dev & hot!
		return(
			<div className="row main">
				<MuiThemeProvider>
					<div style={{width:"90%",margin:"0 auto"}}>
						<SleepShutdownButtons onModeChanged={this.handleOnModeChanged} />
						<div>
							<Chooser onChosen={this.handleOnChosen} />
						</div>
						<div style={{textAlign:"center"}}>
							<Remaining 
								allottedMilliseconds={this.state.chosenMilliseconds} 
								onFinished={this.handleOnFinished}
								timer={this.props.timer}
								/>
						</div>
					</div>
				</MuiThemeProvider>
			</div>
		)
	}

	handleOnChosen(chosenMilliseconds) {
		this.setState({chosenMilliseconds:chosenMilliseconds});
	}
	handleOnFinished() {
		var shouldSleep = this.state.shouldSleep; 
		if(shouldSleep) {
			this.props.signaler.sleep();
		} else {
			this.props.signaler.shutdown();
		}
	}
	handleOnModeChanged(shouldSleep) {
		this.setState({
			shouldSleep:shouldSleep
		});
	}
}

Main.defaultProps = {
	timer:new TimerFacade(),
	signaler:new RendererThreadSignaler()
};
export default Main;
