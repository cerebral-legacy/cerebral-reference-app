function assignmentSolved({state, output}) {
  const assignmentsSolved = state.get(['user', 'assignmentsSolved']);
  const courseId = state.get(['course', 'id']);
  const sceneIndex = state.get(['course', 'currentSceneIndex']);
  const currentAssignmentIndex = state.get(['course', 'currentAssignmentIndex']);

  if (
    assignmentsSolved[courseId] &&
    sceneIndex in assignmentsSolved[courseId] &&
    assignmentsSolved[courseId][sceneIndex] >= currentAssignmentIndex + 1
  ) {
    output.true();
  } else {
    output.false();
  }
}

assignmentSolved.outputs = ['true', 'false'];

export default assignmentSolved;
