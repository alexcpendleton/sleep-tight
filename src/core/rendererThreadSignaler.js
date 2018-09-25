import { ipcRenderer, remote } from 'electron';
import Commands from './commands'

class RendererThreadSignaler {
  constructor() {
    this.renderer = ipcRenderer;
    this.commands = new Commands();
  }
  sleep() {
    this.renderer.send(this.commands.sleep);
  }
  shutdown() {
    this.renderer.send(this.commands.shutdown);
  }
}
export default RendererThreadSignaler;