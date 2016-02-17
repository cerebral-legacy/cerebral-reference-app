function toggle(path) {
  function action({state}) {
    state.set(path, !state.get(path));
  }

  action.displayName = 'TOGGLE ' + path.slice().pop();

  return action;
}

export default toggle;
