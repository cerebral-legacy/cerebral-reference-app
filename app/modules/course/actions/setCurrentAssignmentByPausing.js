function setCurrentAssignmentByPausing({state, services}) {
  const assignmentsPositions = state.get('course.assignmentsPositions');
  const recording = services.recorder.getRecording();
  const lastSignal = services.recorder.getLastSignal();

  if (lastSignal) {
    state.set('course.currentAssignmentIndex', assignmentsPositions.indexOf(lastSignal.start - recording.start));
  }
}

export default setCurrentAssignmentByPausing;
