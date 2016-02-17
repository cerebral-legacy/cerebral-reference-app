function mainAssignmentIsLoaded({state, output}) {
  if (state.get('mainAssignment.files').length) {
    output.true();
  } else {
    output.false();
  }
}

mainAssignmentIsLoaded.outputs = ['true', 'false'];

export default mainAssignmentIsLoaded;
