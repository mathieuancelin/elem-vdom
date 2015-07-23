import { INCREMENT_COUNTER } from './types';

export default function counter(state = 0, action) {
  switch (action.type) {
  case INCREMENT_COUNTER:
    return state + 1;
  default:
    return state;
  }
}
