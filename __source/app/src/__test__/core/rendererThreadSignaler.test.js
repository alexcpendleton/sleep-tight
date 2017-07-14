import RendererThreadSignaler from '../../main/js/core/rendererThreadSignaler'
import Commands from '../../main/js/core/commands'
import ipcRenderer from 'electron';

describe('rendererThreadSignaler', () => {
  describe('constructor', () => {
    /* import ipcRenderer doesn't work right in unit tests
    so we have a level of trust here. I'm sure there's 
    actually a way to test this but it wasn't valuable enough
    to pursue too deeply. */

    it('should default commands to instance of Commands', ()=> {
      const handler = new RendererThreadSignaler();
      expect(handler.commands).toBeInstanceOf(Commands);
    });
  });
  
  describe('sleep', () => {
    it('should call renderer.send with commands.sleep', () => {
      const handler = new RendererThreadSignaler();
      handler.commands.sleep = "mock.sleep";
      handler.renderer = {send:jest.fn()};
      handler.sleep();
      expect(handler.renderer.send).toHaveBeenCalledWith(handler.commands.sleep);
    });
  });
  describe('shutdown', () => {
    it('should call renderer.send with commands.shutdown', () => {
      const handler = new RendererThreadSignaler();
      handler.commands.sleep = "mock.shutdown";
      handler.renderer = {send:jest.fn()};
      handler.shutdown();
      expect(handler.renderer.send).toHaveBeenCalledWith(handler.commands.shutdown);
    });
  });
});