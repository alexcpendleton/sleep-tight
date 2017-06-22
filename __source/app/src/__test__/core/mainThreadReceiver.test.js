import MainThreadReceiver from '../../main/js/core/mainThreadReceiver'
import SleepModeSleeper from '../../main/js/core/sleepers/SleepModeSleeper'
import PowerOffPowerSwitcher from '../../main/js/core/powerOffPowerSwitcher'
import Commands from '../../main/js/core/commands'

describe('mainThreadReceiver', () => {
  describe('constructor', () => {
    /* import ipcMain doesn't work right in unit tests
    so we have a level of trust here. I'm sure there's 
    actually a way to test this but it wasn't valuable enough
    to pursue too deeply. */

    it('should default commands to instance of Commands', ()=> {
      const handler = new MainThreadReceiver();
      expect(handler.commands).toBeInstanceOf(Commands);
    });
    it('should default sleeper to instance of SleepModeSleeper', ()=> {
      const handler = new MainThreadReceiver();
      expect(handler.sleeper).toBeInstanceOf(SleepModeSleeper);
    });
    it('should default powerSwitch to instance of PowerOffPowerSwitcher', ()=> {
      const handler = new MainThreadReceiver();
      expect(handler.powerSwitch).toBeInstanceOf(PowerOffPowerSwitcher);
    });
  });
  
  describe('setup', () => {
    it('should call main.on with commands.sleep', () => {
      const handler = new MainThreadReceiver();
      handler.commands.sleep = "mock.sleep";
      handler.main = {on:jest.fn()};
      handler.setup();
      expect(handler.main.on).toHaveBeenCalledWith(handler.commands.sleep, handler.invokeSleeper);
    });
  });
  describe('setup', () => {
    it('should call main.on with commands.shutdown', () => {
      const handler = new MainThreadReceiver();
      handler.commands.shutdown = "mock.shutdown";
      handler.main = {on:jest.fn()};
      handler.setup();
      expect(handler.main.on).toHaveBeenCalledWith(handler.commands.shutdown, handler.invokePowerSwitch);
    });
  });
  
  describe('invokeSleeper', () => {
    it('should call sleeper.sleepNow()', () => {
      const handler = new MainThreadReceiver();
      handler.sleeper = { sleepNow:jest.fn() };
      handler.invokeSleeper();
      expect(handler.sleeper.sleepNow).toHaveBeenCalled();
    });
  });
  
  describe('invokePowerSwitch', () => {
    it('should call powerSwitch.powerOff()', () => {
      const handler = new MainThreadReceiver();
      handler.powerSwitch = { powerOff:jest.fn() };
      handler.invokePowerSwitch();
      expect(handler.powerSwitch.powerOff).toHaveBeenCalled();
    });
  });
});