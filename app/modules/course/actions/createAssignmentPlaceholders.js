function createAssignmentPlaceholders({services, module}) {
  const sceneIndex = module.state.get('currentSceneIndex');
  const recording = services.recorder.getRecording();
  const assignments = recording.signals.filter((signal) => {
    return signal.name === 'course.pauseClicked' || signal.name === 'course.stopClicked';
  }).map(() => {
    return {
      description: '',
      code: ''
    };
  });
  module.state.set(`scenes.${sceneIndex}.assignments`, assignments);
}

export default createAssignmentPlaceholders;
