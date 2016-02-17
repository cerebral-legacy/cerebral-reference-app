function addNewAssignment({state}) {
  const currentSceneIndex = state.get('course.currentSceneIndex');
  const sceneCursor = state.select(`course.scenes.${currentSceneIndex}`);
  const assignmentsCount = sceneCursor.get('assignments').length;

  sceneCursor.push('assignments', {
    description: '',
    code: '',
    completed: false
  });
  state.set('course.currentAssignmentIndex', assignmentsCount - 1);
  sceneCursor.set('assignmentsCount', assignmentsCount + 1);
}

export default addNewAssignment;
