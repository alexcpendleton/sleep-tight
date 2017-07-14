import React from 'react'
import {shallow} from 'enzyme'
import Chooser from '../../main/js/components/chooser'
import Slider from 'material-ui/Slider';

function setup(opts) {
  opts = opts || {};
  var enzymeWrapper;
  if(opts.props){
    enzymeWrapper = shallow(<Chooser {...opts.props}/>);
  } else {
    enzymeWrapper = shallow(<Chooser />);
  }

  if(opts.state) {
    enzymeWrapper.setState(opts.state);
  }
  return enzymeWrapper;
}

describe('components', () => {
		describe('Chooser', () => {
      describe('constructor', ()=> {
        it('should set state.maxMilliseconds to 7200000', ()=> {
          const wrapper = setup();
          expect(wrapper.state().maxMilliseconds).toBe(7200000);
        });
      });
      describe('render', ()=> {
        it('should have a Slider with min of 0 and step of 1000 and max of state.maxMilliseconds', ()=> {
          var maxMilliseconds = 30;
          const wrapper = setup({state:{maxMilliseconds:maxMilliseconds}});
          var slider = wrapper.find(Slider).first().node.props;
          expect(slider.min).toBe(0);
          expect(slider.step).toBe(1000);
          expect(slider.max).toBe(maxMilliseconds);
        });
        it('should have a Slider with value of 3000 when state.chosenMilliseconds is 3000', ()=> {
            var chosenMilliseconds = 3000;
            const wrapper = setup({state:{chosenMilliseconds:chosenMilliseconds}});
            var slider = wrapper.find(Slider).first().node.props;
            expect(slider.value).toBe(chosenMilliseconds);
        });
      });
      describe('triggerChanged', ()=> {
        it('should call props.onChanged with second param', ()=> {
          var chosenMilliseconds = 2000,
            onChosen = jest.fn();
          const wrapper = setup({
            state:{chosenMilliseconds:0},
            props:{onChosen:onChosen}
          });
          wrapper.instance().triggerChange({}, chosenMilliseconds);
          expect(onChosen).toHaveBeenCalledWith(chosenMilliseconds);
        })
      });
		});
});