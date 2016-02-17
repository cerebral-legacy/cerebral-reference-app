function registerErrorMessage({state, input}) {
  state.set(['home', 'registerErrorMessage'], input.message);
}

export default registerErrorMessage;
