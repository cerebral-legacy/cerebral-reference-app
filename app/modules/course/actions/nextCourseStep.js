function nextCourseStep({state, output}) {
  const courseCursor = state.select('course');
  const currentAssignmentIndex = courseCursor.get('currentAssignmentIndex');
  const assignmentsPositions = courseCursor.get('assignmentsPositions');
  const scenes = courseCursor.get('scenes');
  const currentSceneIndex = courseCursor.get('currentSceneIndex');

  const noMoreAssignments = currentAssignmentIndex === assignmentsPositions.length - 1;
  const isLastScene = Number(currentSceneIndex) === Number(scenes.length - 1);

  if (noMoreAssignments && isLastScene) {
    output.course();
  } else if (noMoreAssignments) {
    output.scene({
      sceneIndex: Number(currentSceneIndex) + 1
    });
  } else {
    output.assignment({
      seek: assignmentsPositions[currentAssignmentIndex] + 100
    });
  }
}

nextCourseStep.outputs = ['course', 'scene', 'assignment'];

export default nextCourseStep;
