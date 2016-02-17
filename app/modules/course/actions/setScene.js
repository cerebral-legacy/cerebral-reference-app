function setScene({input, state, services}) {
  const currentFileIndex = state.get(`course.scenes.${input.sceneIndex}.currentFileIndex`);
  const scene = input.scene;
  const recording = scene.recording;

  if (scene.recording) {
    scene.duration = scene.recording.duration;
  }

  // We do not need to put the recording in the state tree
  scene.recording = Boolean(scene.recording);

  state.set(`course.scenes.${input.sceneIndex}`, scene);

  const sceneCursor = state.select(`course.scenes.${input.sceneIndex}`);
  sceneCursor.set('sandboxFiles', scene.files);

  if (currentFileIndex) {
    sceneCursor.set('currentFileIndex', currentFileIndex);
  } else {
    sceneCursor.set('currentFileIndex', 0);
  }

  if (recording) {
    services.recorder.loadRecording(recording);

    // When tier opens we should download the status of solved assignments
    state.set('user.assignmentsSolved', services.localAssignments.getAll());
  }

  state.set('course.currentSceneIndex', input.sceneIndex);
}

export default setScene;
