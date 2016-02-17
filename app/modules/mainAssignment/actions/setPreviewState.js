function setPreviewState({state, input}) {
  if (input.preview) {
    state.set('mainAssignment.preview', true);
  } else {
    state.set('mainAssignment.preview', false);
  }
}

export default setPreviewState;
