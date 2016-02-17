function isCompletedAssignment({input, state, output}) {
  const canUpdate = !state.get('user.isAdmin') || state.get('user.forceUser');

  if (input.result === true && canUpdate) {
    output.true();
  } else {
    output.false();
  }
}

isCompletedAssignment.outputs = ['true', 'false'];

export default isCompletedAssignment;
