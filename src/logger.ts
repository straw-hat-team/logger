import { LogLevels } from './levels';
import { LogHandler } from './log-handler';
import { LogEvent, Message, Metadata } from './log-event';

export interface LoggerOptions {
  handlers?: LogHandler[];
}

export class Logger {
  readonly #name: string;
  readonly #handlers: Set<LogHandler>;
  #metadata: Metadata;

  constructor(name: string, opts?: LoggerOptions) {
    this.#name = name;
    this.#handlers = new Set(opts?.handlers ?? []);
    this.#metadata = {};
  }

  addHandler(handler: LogHandler) {
    this.#handlers.add(handler);
    return this;
  }

  removeHandler(handler: LogHandler) {
    this.#handlers.delete(handler);
    return this;
  }

  addMetadata(metadata: Metadata) {
    this.#metadata = Object.assign(this.#metadata, metadata);
    return this;
  }

  /**
   * For debug-related messages
   */
  debug(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Debug, message, metadata);
  }

  /**
   * For information of any kind
   */
  info(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Info, message, metadata);
  }

  /**
   * For normal, but significant, messages
   */
  notice(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Notice, message, metadata);
  }

  /**
   * For warnings
   */
  warning(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Warning, message, metadata);
  }

  /**
   * For errors
   */
  error(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Error, message, metadata);
  }

  /**
   * For critical conditions
   */
  critical(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Critical, message, metadata);
  }

  /**
   * For alerts, actions that must be taken immediately, ex. corrupted database
   */
  alert(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Alert, message, metadata);
  }

  /**
   * For when system is unusable, panics
   */
  emergency(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Emergency, message, metadata);
  }

  /**
   * Sends a log event
   */
  log(level: LogLevels, message: Message, metadata: Metadata = {}) {
    const event = new LogEvent({
      logger: this.#name,
      level,
      message,
      time: new Date(),
      metadata: Object.assign({}, this.#metadata, metadata),
    });

    this.#handlers.forEach((handler) => handler.maybeHandleEvent(event));
    return this;
  }
}
