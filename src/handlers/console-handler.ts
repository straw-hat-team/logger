import { LogEvent } from '../log-event';
import { LogLevels } from '../levels';
import { LogHandler } from '../log-handler';

function padTime(n: number) {
  return n < 10 ? '0' + n : n.toString();
}

function formatTimestamp(date: Date) {
  const min = padTime(date.getMinutes());
  const sec = padTime(date.getSeconds());
  const ms = date.getMilliseconds();
  return `${min}:${sec}.${ms}`;
}

export type ConsoleHandlerConsole = Pick<Console, 'debug' | 'error' | 'info' | 'warn' | 'table'>;

export interface ConsoleHandlerOptions {
  level?: LogLevels;
  console?: ConsoleHandlerConsole;
}

export class ConsoleHandler extends LogHandler {
  readonly #console: ConsoleHandlerConsole;

  constructor(level: LogLevels, opts?: ConsoleHandlerOptions) {
    super(level);
    this.#console = opts?.console ?? console;
  }

  async handleEvent(event: LogEvent) {
    const log = this.#getLogger(event.level);
    return log(`[${event.levelName}] ${formatTimestamp(event.time)} - ${event.message}`, event.metadata);
  }

  #getLogger = (level: LogLevels) => {
    const CONSOLE_MAPPING = {
      [LogLevels.Notset]: Function.prototype,
      [LogLevels.Debug]: this.#console.debug,
      [LogLevels.Info]: this.#console.info,
      [LogLevels.Notice]: this.#console.info,
      [LogLevels.Warning]: this.#console.warn,
      [LogLevels.Error]: this.#console.error,
      [LogLevels.Critical]: this.#console.error,
      [LogLevels.Alert]: this.#console.error,
      [LogLevels.Emergency]: this.#console.error,
      [LogLevels.Table]: this.#console.table,
    };

    return CONSOLE_MAPPING[level];
  };
}
