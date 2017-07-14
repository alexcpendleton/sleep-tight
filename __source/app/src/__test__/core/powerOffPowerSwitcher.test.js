var po = require("power-off");
import PowerOffPowerSwitcher from '../../main/js/core/powerOffPowerSwitcher'

describe('powerOffPowerSwitcher', () => {
  describe('constructor', () => {
    it('should default switch to power-off', ()=> {
      const underTest = new PowerOffPowerSwitcher();
      expect(underTest.switch).toBe(po);
    });
  });
  describe('powerOff', () => {
    it('should call switch', () => {
      const underTest = new PowerOffPowerSwitcher();
      underTest.switch = jest.fn();
      underTest.powerOff();
      expect(underTest.switch).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});