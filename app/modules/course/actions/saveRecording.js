function saveRecording({state, output, services}) {
  const courseId = state.get('course.id');
  const sceneIndex = state.get('course.currentSceneIndex');
  const recording = services.recorder.getRecording();

  services.http.patch(`/API/courses/${courseId}/scenes/${sceneIndex}`, {
    recording: recording
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

saveRecording.async = true;

export default saveRecording;
