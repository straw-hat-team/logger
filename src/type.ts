import { LogLevels } from './levels';

export interface StrawHatGlobals {
  STRAW_HAT_GLOBALS: {
    logger?: {
      level?: LogLevels;
    };
  };
}
