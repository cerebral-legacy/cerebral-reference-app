function updateAssignmentDescription({input, state}) {
  const currentSceneIndex = state.get('course.currentSceneIndex');
  const currentAssignmentIndex = state.get('course.currentAssignmentIndex');

  state.set(`course.scenes.${currentSceneIndex}.assignments.${currentAssignmentIndex}.description`, input.description);
}

export default updateAssignmentDescription;
