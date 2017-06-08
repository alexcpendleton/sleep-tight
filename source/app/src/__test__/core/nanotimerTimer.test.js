import NanoTimer from 'nanotimer'
import NanoTimerTimer from '../../main/js/core/nanotimerTimer'

describe('nanotimerTimer', () => {
  function easyOpts(){
    return {
      milliseconds:5000,
      tickInterval:1000,
      onTick:jest.fn(),
      callback:jest.fn()
    }
  };
  function mockNano() {
    return {
      setInterval:jest.fn(),
      setTimeout:jest.fn(),
      clearInterval:jest.fn(),
      clearTimeout:jest.fn()
    };
  }
  describe('constructor', () => {
    it('should default `activeTimer` to instance of NanoTimer', ()=> {
      var underTest = new NanoTimerTimer();
      expect(underTest.activeTimer).toBeInstanceOf(NanoTimer);
    });
  });
  describe('startNew', () => {
    it('should call stopActive()', () => {
      var underTest = new NanoTimerTimer();
      underTest.activeTimer = mockNano();
      underTest.stopActive = jest.fn();
      underTest.startNew(easyOpts());
      expect(underTest.stopActive).toHaveBeenCalled();
    });
    it('should set .remainingMilliseconds to opts.milliseconds', () => {
      var underTest = new NanoTimerTimer(),
        opts = easyOpts();
      underTest.activeTimer = mockNano();
      underTest.startNew(opts);
      expect(underTest.remainingMilliseconds).toEqual(opts.milliseconds);
    });
    it("should call activeTimer.setTimeout with a fn, '', '{opts.milliseconds}m'", () => {
      var underTest = new NanoTimerTimer(),
        opts = easyOpts(),
        expectedTime = opts.milliseconds + 'm';
      underTest.activeTimer = mockNano();
      underTest.startNew(opts);
      /* Not sure how to test the accuracy of the inner function without
         calling it directly. Probably a sign of a code smell. */
      expect(underTest.activeTimer.setTimeout)
        .toHaveBeenCalledWith(expect.any(Function), "", expectedTime);
    });
    it("should call activeTimer.setInterval with a fn, '', '{opts.tickInterval}m'", () => {
      var underTest = new NanoTimerTimer(),
        opts = easyOpts(),
        expectedTime = opts.tickInterval + 'm';
      underTest.activeTimer = mockNano();
      underTest.startNew(opts);
      /* Not sure how to test the accuracy of the inner function without
         calling it directly. Probably a sign of a code smell. */
      expect(underTest.activeTimer.setInterval)
        .toHaveBeenCalledWith(expect.any(Function), "", expectedTime);
    });
    it("should call opts.callback and stopActive when finished", () => {
      var underTest = new NanoTimerTimer(),
        opts = easyOpts();
      underTest.activeTimer = mockNano();
      // mock setTimeout to call immediately, simulating finished state
      underTest.activeTimer.setTimeout = (callback)=>{
        callback();
      };
      underTest.stopActive = jest.fn();
      underTest.startNew(opts);

      expect(opts.callback).toHaveBeenCalled();
      expect(underTest.stopActive).toHaveBeenCalled();
    });
    it("should call _onTick with opts on each interval", () => {
      var underTest = new NanoTimerTimer(),
        opts = easyOpts();
      underTest.activeTimer = mockNano();
      underTest.activeTimer.setInterval = (callback)=>{
        callback();
      };
      underTest._onTick = jest.fn();
      underTest.stopActive = jest.fn();
      underTest.startNew(opts);

      expect(underTest._onTick).toHaveBeenCalledWith(opts);
    });
    it('should return activeTimer', () => {
    it("should call _onTick with opts on each interval", () => {
      var underTest = new NanoTimerTimer(),
        opts = easyOpts();
      underTest.activeTimer = mockNano();
      var result = underTest.startNew(opts);
      expect(result).toBe(underTest.activeTimer);
    });
    });
  });
  
  describe('stopActive', () => {
    it('should call activeTimer.clearInterval', () => {
      var underTest = new NanoTimerTimer();
      underTest.activeTimer.clearInterval = jest.fn();
      underTest.stopActive();
      expect(underTest.activeTimer.clearInterval).toHaveBeenCalled();
    });
    it('should call activeTimer.clearTimeout', () => {
      var underTest = new NanoTimerTimer();
      underTest.activeTimer.clearTimeout = jest.fn();
      underTest.stopActive();
      expect(underTest.activeTimer.clearTimeout).toHaveBeenCalled();
    });
  });
  describe('_onTick', () => {
    it('should reduce remainingMilliseconds by opts.tickInterval', () => {
      var underTest = new NanoTimerTimer();
      underTest.remainingMilliseconds = 1000;
      var opts = {
        onTick:jest.fn(),
        tickInterval:200
      };
      underTest._onTick(opts);
      expect(underTest.remainingMilliseconds).toEqual(800);
    });
    it('should call opts.onTick with remainingMilliseconds', () => {
      var underTest = new NanoTimerTimer();
      underTest.remainingMilliseconds = 1000;
      var opts = {
        onTick:jest.fn(),
        tickInterval:200
      };
      underTest._onTick(opts);
      expect(opts.onTick).toHaveBeenCalledWith(800);
    });
  });
});