function setInput(key, value) {
  function action({output}) {
    output({
      [key]: value
    });
  }

  action.displayName = `setInput (${key})`;

  return action;
}

export default setInput;
