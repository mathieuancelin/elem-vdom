import { INCREMENT_COUNTER } from './types';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}
