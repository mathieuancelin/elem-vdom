import * as Utils from '../utils';
import Redbox from './redbox';

export default function ErrorMonitor(wrapped) {
  if (!Utils.isFunction(wrapped)) {
    throw new Error('ErrorMonitor should only wrap functions');
  }
  return (ctx, props) => {
    try {
      return wrapped.bind({ ...ctx, props })(ctx, props);
    } catch(e) {
      console.log(e);
      return Redbox(e);
    }
  };
}
