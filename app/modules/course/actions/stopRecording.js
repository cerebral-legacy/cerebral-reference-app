function stopRecording({state, services}) {
  state.merge('recorder', {
    isRecording: false,
    isPlaying: false,
    hasRecorded: true,
    isEnded: true
  });
  services.recorder.stop();
  const currentSceneIndex = state.get('course.currentSceneIndex');
  state.set(`course.scenes.${currentSceneIndex}.duration`, services.recorder.getRecording().duration);
}

export default stopRecording;
