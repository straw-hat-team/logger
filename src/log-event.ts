import { getLevelName, LevelName, LogLevels } from './levels';

export type Metadata = Record<any, any>;
export type Message = string;
export type TableData = any[];

export interface LogEventOptions {
  data?: TableData;
  logger: string;
  level: LogLevels;
  message?: Message;
  metadata: Metadata;
  time: Date;
}

export class LogEvent {
  readonly logger: string;
  readonly levelName: LevelName;
  readonly level: LogLevels;
  readonly message?: Message;
  readonly data?: TableData;
  readonly time: Date;
  metadata: Metadata;

  constructor(opts: LogEventOptions) {
    this.data = opts?.data;
    this.logger = opts.logger;
    this.level = opts.level;
    this.message = opts?.message;
    this.metadata = opts.metadata;
    this.time = opts.time;
    this.levelName = getLevelName(opts.level);
  }

  toJSON() {
    return {
      logger: this.logger,
      level: this.level,
      levelName: this.levelName,
      message: this.message,
      metadata: this.metadata,
      time: this.time.getTime(),
    };
  }
}
