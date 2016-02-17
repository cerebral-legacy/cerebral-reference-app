function updateAssignmentCode({input, state}) {
  const currentSceneIndex = state.get('course.currentSceneIndex');
  const currentAssignmentIndex = state.get('course.currentAssignmentIndex');

  state.set(`course.scenes.${currentSceneIndex}.assignments.${currentAssignmentIndex}.code`, input.code);
}

export default updateAssignmentCode;
