import { LogEvent } from './log-event';
import { LogLevels } from './levels';
import { StrawHatGlobals } from './type';

function getContext() {
  return (globalThis as unknown) as StrawHatGlobals;
}

export class LogHandler {
  #level: LogLevels;

  constructor(level: LogLevels) {
    this.#level = level;
  }

  get level() {
    return this.#level;
  }

  setLevel(level: LogLevels) {
    this.#level = level;
    return this;
  }

  async maybeHandleEvent(event: LogEvent) {
    if (this.#isOutOfRange(event)) {
      return;
    }
    return this.handleEvent(event);
  }

  async handleEvent(_event: LogEvent) {
    throw new Error('Missing implementation');
  }

  #isOutOfRange = (event: LogEvent) => {
    return event.level - this.#getLogLevel() < 0;
  };

  #getLogLevel = () => {
    return getContext().STRAW_HAT_GLOBALS?.logger?.level ?? this.level;
  };
}
