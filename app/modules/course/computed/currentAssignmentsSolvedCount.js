function currentAssignmentsSolvedCount(get) {
  const assignmentsSolved = get(['user', 'assignmentsSolved']);
  const courseId = get(['course', 'id']);
  const sceneIndex = get(['course', 'currentSceneIndex']);

  if (assignmentsSolved[courseId]) {
    if (assignmentsSolved[courseId][sceneIndex]) {
      return assignmentsSolved[courseId][sceneIndex];
    }
  }

  return 0;
}

export default currentAssignmentsSolvedCount;
