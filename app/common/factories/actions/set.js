function set(path, value) {
  function action({state}) {
    state.set(path, value);
  }

  action.displayName = 'SET ' + path.slice().pop();

  return action;
}

export default set;
