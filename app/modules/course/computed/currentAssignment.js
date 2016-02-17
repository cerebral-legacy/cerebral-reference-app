function currentAssignment(get) {
  const currentAssignmentIndex = get(['course', 'currentAssignmentIndex']);
  const currentSceneIndex = get(['course', 'currentSceneIndex']);

  return get(['course', 'scenes', currentSceneIndex, 'assignments', currentAssignmentIndex]);
}

export default currentAssignment;
