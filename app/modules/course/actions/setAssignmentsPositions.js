import currentScene from '../computed/currentScene';

function setAssignmentsPositions({state, services}) {
  const scene = state.get(currentScene);

  if (scene.recording) {
    const recording = services.recorder.getRecording();
    const assignments = recording.signals.filter((signal) => {
      return signal.name === 'course.pauseClicked' || signal.name === 'course.stopClicked';
    }).map((signal) => {
      return signal.start - recording.start;
    });
    state.set('course.assignmentsPositions', assignments);
  } else {
    state.set('course.assignmentsPositions', []);
  }
}

export default setAssignmentsPositions;
