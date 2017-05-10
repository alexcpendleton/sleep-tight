import React from 'react'
import {shallow} from 'enzyme'
import SleepShutdownButtons from '../../main/js/components/sleepShutdownButtons'
import RaisedButton from 'material-ui/RaisedButton';

function setup(opts) {
  opts = opts || {};
  var enzymeWrapper;
  if(opts.props){
    enzymeWrapper = shallow(<SleepShutdownButtons {...opts.props}/>);
  } else {
    enzymeWrapper = shallow(<SleepShutdownButtons />);
  }

  if(opts.state) {
    enzymeWrapper.setState(opts.state);
  }
  return enzymeWrapper;
}
const selectors = {
  sleepButton:"#sleep",
  shutdownButton:"#shutdown"
}
describe('components', () => {
  describe('sleepShutdownButtons', () => {
    describe('constructor', () => {
      it('should default state.sleep to true', () => {
        const buttons = setup();
        expect(buttons.state().sleep).toBe(true);
      });
      it('should default props.onModeChanged to a function', () => {
        const buttons = setup();
        expect(buttons.instance().props.onModeChanged).toBeDefined();
        expect(buttons.instance().props.onModeChanged).toBeInstanceOf(Function);
      });
    });
    
    describe('state.sleep', () => {
      it('when true, should set sleep button as primary and shutdown button as non-primary', () => {
        const buttons = setup({state:{sleep:true}});
        const h = buttons.debug();
        const sleep = buttons.find(selectors.sleepButton).first();
        const shutdown = buttons.find(selectors.shutdownButton).first();
        expect(sleep.node.props.primary).toBe(true);
        expect(shutdown.node.props.primary).toBe(false);
      });
      it('when false, should set sleep button as non-primary and shutdown button as primary', () => {
        const buttons = setup({state:{sleep:false}});
        const sleep = buttons.find(selectors.sleepButton).first();
        const shutdown = buttons.find(selectors.shutdownButton).first();
        expect(sleep.node.props.primary).toBe(false);
        expect(shutdown.node.props.primary).toBe(true);
      });
    });
    
    describe('onModeChanged', () => {
      it('should be called with true after sleepChosen() if state.sleep is false', () => {
        const props = {onModeChanged:jest.fn()}
        const buttons = setup({state:{sleep:false}, props:props});
        const sleep = buttons.find(selectors.sleepButton).first();
        buttons.instance().sleepChosen();
        expect(props.onModeChanged).toHaveBeenCalledWith(true);
      });
      it('should be called with false after shutdownChosen() if state.sleep is true', () => {
        const props = {onModeChanged:jest.fn()}
        const buttons = setup({state:{sleep:true}, props:props});
        const shutdown = buttons.find(selectors.shutdownButton).first();
        buttons.instance().shutdownChosen();
        expect(props.onModeChanged).toHaveBeenCalledWith(false);
      });
      it('should not be called with true after sleepChosen() if state.sleep is true', () => {
        const props = {onModeChanged:jest.fn()}
        const buttons = setup({state:{sleep:true}, props:props});
        const sleep = buttons.find(selectors.sleepButton).first();
        buttons.instance().sleepChosen();
        expect(props.onModeChanged).not.toHaveBeenCalled();
      });
      it('should not be called with false after shutdownChosen() if state.sleep is false', () => {
        const props = {onModeChanged:jest.fn()}
        const buttons = setup({state:{sleep:false}, props:props});
        const shutdown = buttons.find(selectors.shutdownButton).first();
        buttons.instance().shutdownChosen();
        expect(props.onModeChanged).not.toHaveBeenCalled();
      });
    });
  });
});