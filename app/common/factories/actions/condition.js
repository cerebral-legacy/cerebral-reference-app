function condition(path) {
  function action({state, output}) {
    output[state.get(path)]();
  }

  action.displayName = `condition (${path.slice().pop()})`;
  action.outputs = ['true', 'false'];

  return action;
}

export default condition;
