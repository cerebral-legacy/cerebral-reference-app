function updateInput({state, input}) {
  state.set(['home', input.form, input.type], input.value);
}

export default updateInput;
