import React from 'react'
import {
	shallow
} from 'enzyme'
import Remaining from '../../main/js/components/remaining'
import IconButton from 'material-ui/IconButton';
import AvPause from 'material-ui/svg-icons/av/pause.js';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow.js';
import AvReplay from 'material-ui/svg-icons/av/replay.js';
import NanoTimerTimer from '../../main/js/core/nanotimerTimer.js'

function setup(props) {
	if(!props) {
		props = {timer:spyTimer()}
	}
	const wrapper = shallow( < Remaining timer={props.timer} /> )

	return wrapper;
}

function spyTimer() {
	return {
		startNew:jest.fn(),
		stopActive:jest.fn(),
	};
}
describe('components', () => {
	describe('Remaining', () => {
		it('should render AvPlayArrow when state.started is false', () => {
			const wrapper = setup();
			wrapper.setState({
				started: false
			});
			expect(wrapper.find('AvPlayArrow').length).toBe(1);
		});
		it('should not render AvPlayArrow when state.started is true', () => {
			const wrapper = setup();
			wrapper.setState({
				started: true
			});
			expect(wrapper.find('AvPlayArrow').length).toBe(0);
		});

		it('should not render AvPause when state.started is false', () => {
			const wrapper = setup();
			wrapper.setState({
				started: false
			});
			expect(wrapper.find('AvPause').length).toBe(0);
		});
		it('should render AvPause when state.started is true', () => {
			const wrapper = setup();
			wrapper.setState({
				started: true
			});
			expect(wrapper.find('AvPause').length).toBe(1);
		});


		it('should render AvReplay when state.started is true', () => {
			const wrapper = setup();
			wrapper.setState({
				started: true
			});
			expect(wrapper.find('AvReplay').length).toBe(1);
		});
		it('should render AvReplay when state.started is true', () => {
			const wrapper = setup();
			wrapper.setState({
				started: true
			});
			expect(wrapper.find('AvReplay').length).toBe(1);
		});


		it('should render #remainingTime of 00:10:05 when state.remainingMilliseconds is 605000', () => {
			const wrapper = setup();
			wrapper.setState({
				remainingMilliseconds: 605000
			});
			expect(wrapper.find('#remainingTime').text()).toBe("00:10:05");
		});
		it('should render #remainingTime of 00:00:00 when state.remainingMilliseconds is 0', () => {
			const wrapper = setup();
			wrapper.setState({
				remainingMilliseconds: 0
			});
			expect(wrapper.find('#remainingTime').text()).toBe("00:00:00");
		});

		it('should have undefined props.timer', ()=>{
			const wrapper = <Remaining />;
			expect(wrapper.props.timer).not.toBeDefined();
		});

		describe('start', ()=> {
			it('should set state.started to true', ()=> {
				const wrapper = setup();
				wrapper.setState({started: false});
				wrapper.instance().start();
				expect(wrapper.state().started).toBe(true);
			});
			if('should set state.remainingMilliseconds to state.allottedMilliseconds when state.remainingMilliseconds is 0', ()=> {
				const wrapper = setup(),
					allottedMilliseconds = 3253;
				wrapper.setState({started: false, 
					remainingMilliseconds:0,
					allottedMilliseconds:allottedMilliseconds});
				wrapper.instance().start();
				expect(wrapper.state().allottedMilliseconds)
					.toBe(allottedMilliseconds);
			});
			if('should set not change state.remainingMilliseconds or state.allottedMilliseconds if is not equal to 0', ()=> {
				const wrapper = setup({
					// Set the timer to fakes so it doesn't start ticking
					props:{timer:spytimer()}
				}),
					allottedMilliseconds = 3253,
					remainingMilliseconds = 2222;
				
				wrapper.setState({started: false, 
					remainingMilliseconds:remainingMilliseconds,
					allottedMilliseconds:allottedMilliseconds});
				wrapper.instance().start();
				expect(wrapper.state().allottedMilliseconds)
					.toBe(allottedMilliseconds);
				expect(wrapper.state().remainingMilliseconds)
					.toBe(remainingMilliseconds);
			});
			it('should call props.timer.startNew with state.allottedMilliseconds', ()=> {
				const allottedMilliseconds = 90210;
				var startNewMock = (opts)=> {
					expect(opts.callback).toBeInstanceOf(Function);
					expect(opts.milliseconds).toBe(allottedMilliseconds);
					expect(opts.tickInterval).toBe(1000);
					expect(opts.onTick).toBeInstanceOf(Function); 
				};
				var props = {
					timer:{
						stopActive:jest.fn(),
						startNew:startNewMock
					}
				};
				const remaining = shallow(<Remaining timer={props.timer}/>);
				remaining.setState({
					allottedMilliseconds:allottedMilliseconds
				});
				remaining.instance().start();
			});
			it('should call props.timer.startNew with state.remainingMilliseconds when state.remainingMilliseconds is not equal to 0', ()=> {
				const allottedMilliseconds = 90210,
					remainingMilliseconds = 33033;
				var props = { timer:spyTimer() };
				props.timer.startNew = (opts)=> {
					expect(opts.milliseconds).toBe(remainingMilliseconds);
				};
				const remaining = shallow(<Remaining timer={props.timer}/>);
				remaining.setState({
					allottedMilliseconds: allottedMilliseconds,
					remainingMilliseconds: remainingMilliseconds
				});
				remaining.instance().start();
			});
		});
		describe('tick', ()=> {
			it('should set state.remainingMilliseconds to the passed parameter value', ()=> {
				const remaining = shallow(<Remaining/>),
					expected = 12345;
				remaining.instance().tick(expected);
				expect(remaining.state().remainingMilliseconds).toBe(expected);
			});
		});

		describe('pause', ()=> {
			it('should set state.started to false', ()=> {
				const wrapper = setup()
				wrapper.setState({started: true});
				wrapper.instance().pause()
				expect(wrapper.state().started).toBe(false);
			});

			it('should call timer.stopActive', ()=> {
				var props = {
					timer:{
						stopActive:jest.fn(),
						startNew:jest.fn()
					}
				};
				const wrapper = shallow( < Remaining timer={props.timer} /> );
				wrapper.instance().pause();
				expect(props.timer.stopActive).toHaveBeenCalled();
			});
		});

		describe('restart', ()=> {
			it('should set state.remainingMilliseconds to state.allottedMilliseconds', ()=> {
				var props = {
					timer:{
						stopActive:jest.fn(),
						startNew:jest.fn()
					}
				};
				const wrapper = shallow( < Remaining timer={props.timer} /> ),
					allottedMilliseconds = 65000;
				wrapper.setState({allottedMilliseconds: allottedMilliseconds
					, remainingMilliseconds: 2000});
				wrapper.instance().restart();
				expect(wrapper.state().remainingMilliseconds).toBe(allottedMilliseconds);
			});
			it('should call timer.startNew()', ()=> {
				var props = {
					timer:{
						stopActive:jest.fn(),
						startNew:jest.fn()
					}
				};
				const wrapper = shallow( < Remaining timer={props.timer} /> );
				wrapper.instance().restart();
				expect(props.timer.startNew).toHaveBeenCalled();
			});
		});
		describe('finish', ()=> {
			it('should set state.started to false and trigger props.onFinished', ()=> {
				const props = { timer: spyTimer(), onFinished:jest.fn() };
				const wrapper = shallow(<Remaining {...props}/>);
				wrapper.setState({started:true});
				wrapper.instance().finish();
				expect(props.onFinished).toHaveBeenCalled();
				expect(wrapper.state().started).toBe(false);
			});
		});
		
		describe('hasFreshAllotedMilliseconds', () => {
			it('should return false when .allottedMilliseconds is undefined', () => {
				const wrapper = shallow(<Remaining />);
				const result = wrapper.instance()
					.hasFreshAllottedMilliseconds({});
				expect(result).toBe(false);
			});
			it('should return false when .allottedMilliseconds is 0', () => {
				const wrapper = shallow(<Remaining />),
					props = {allottedMilliseconds:0};
				const result = wrapper.instance()
					.hasFreshAllottedMilliseconds(props);
				expect(result).toBe(false);
			});
			it('should return false when .allottedMilliseconds is equal to state.allottedMilliseconds', () => {
				const wrapper = shallow(<Remaining />),
					newProps = {allottedMilliseconds:300},
					state = {allottedMilliseconds:300};
				wrapper.setState(state);
				const result = wrapper.instance()
					.hasFreshAllottedMilliseconds(newProps);
				expect(result).toBe(false);
			});
			it('should return true when .allottedMilliseconds != state.allottedMilliseconds', () => {
				const wrapper = shallow(<Remaining />),
					newProps = {allottedMilliseconds:500},
					state = {allottedMilliseconds:300};
				wrapper.setState(state);
				const result = wrapper.instance()
					.hasFreshAllottedMilliseconds(newProps);
				expect(result).toBe(true);
			});
		});
		describe('initiateStartFromNewPropsIfNecessary', () => {
			it('should set state.allottedMilliseconds and state.remainingMilliseconds to .allottedMilliseconds when values differ', () => {
				var timer = spyTimer();
				const wrapper = shallow(<Remaining timer={timer} />),
					newProps = {allottedMilliseconds:500},
					state = {allottedMilliseconds:300};
				wrapper.setState(state);
				wrapper.instance()
					.initiateStartFromNewPropsIfNecessary(newProps);
				var newState = wrapper.state();
				expect(newState.allottedMilliseconds).toBe(newProps.allottedMilliseconds);
				expect(newState.remainingMilliseconds).toBe(newProps.allottedMilliseconds);
				expect(timer.startNew).toHaveBeenCalled();
			});
		});
	});
});