function setCompletedAssignment({state, services}) {
  const user = state.get('user');
  const courseCursor = state.select('course');
  const courseId = courseCursor.get('id');
  const sceneIndex = courseCursor.get('currentSceneIndex');
  const assignmentsSolvedCount = services.localAssignments.get(courseId, sceneIndex);

  let assignmentsSolved;

  if (user.isAdmin) {
    const currentAssignmentIndex = courseCursor.get('currentAssignmentIndex');
    assignmentsSolved = services.localAssignments.setFake(courseId, sceneIndex, currentAssignmentIndex + 1);
  } else {
    assignmentsSolved = services.localAssignments.set(courseId, sceneIndex, assignmentsSolvedCount + 1);
  }

  state.set('user.assignmentsSolved', assignmentsSolved);
}

export default setCompletedAssignment;
