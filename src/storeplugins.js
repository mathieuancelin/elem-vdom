export default {
  Logger: store => next => action => {
    console.group(action.type);
    console.info('Dispatching', action);
    let result = next(action);
    console.log('Next state', store.getState());
    console.groupEnd(action.type);
    return result;
  },
  PromiseFieldHandler: store => next => action => { // eslint-disable-line no-unused-vars
    if (!action.promise) {
      return next(action);
    }
    function makeAction(ready, data) {
      let newAction = Object.assign({}, action, { ready }, data);
      delete newAction.promise;
      return newAction;
    }
    next(makeAction(false));
    return action.promise.then(
      result => next(makeAction(true, { result })),
      error => next(makeAction(true, { error }))
    );
  }
};
