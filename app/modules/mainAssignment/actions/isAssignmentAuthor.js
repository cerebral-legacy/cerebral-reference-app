function isAssignmentAuthor({state, output}) {
  const assignmentUserId = state.get('mainAssignment.userId');
  const userId = state.get('user.id');

  if (assignmentUserId === userId) {
    output.true();
  } else {
    output.false();
  }
}

isAssignmentAuthor.outputs = ['true', 'false'];

export default isAssignmentAuthor;
