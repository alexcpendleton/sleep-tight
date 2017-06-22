import Commands from '../../main/js/core/commands'

describe('commands', () => {
		describe('constructor', () => {
				it('should default sleep to sleep-tight.sleep', () => {
					var underTest = new Commands();
          expect(underTest.sleep).toBe("sleep-tight.sleep");
				})
				it('should default shutdown to sleep-tight.shutdown', () => {
					var underTest = new Commands();
          expect(underTest.shutdown).toBe("sleep-tight.shutdown");
				})
		})
})