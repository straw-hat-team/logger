import { ConsoleHandler } from '../../src/handlers/console-handler';
import { LogEvent, LogLevels } from '../../src';

function createConsole() {
  return {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}

describe('ConsoleHandler', () => {
  it('formats the prefix of the message properly', () => {
    const mockConsole = createConsole();
    const handler = new ConsoleHandler(LogLevels.Notset, { console: mockConsole });
    handler.handleEvent(
      new LogEvent({
        logger: 'app',
        level: LogLevels.Warning,
        message: 'Hello, World',
        time: new Date('2020-01-01T00:00:00'),
        metadata: { hello: 'world' },
      })
    );
    expect(mockConsole.warn).toBeCalledWith('[Warning] 00:00.0 - Hello, World', { hello: 'world' });

    handler.handleEvent(
      new LogEvent({
        logger: 'app',
        level: LogLevels.Warning,
        message: 'Hello, World',
        time: new Date('2020-01-01T12:30:00'),
        metadata: { hello: 'world' },
      })
    );
    expect(mockConsole.warn).toBeCalledWith('[Warning] 30:00.0 - Hello, World', { hello: 'world' });
  });
});
