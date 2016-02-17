function playRecording({state, services}) {
  state.merge('recorder', {
    isPlaying: true,
    isEnded: false
  });
  services.recorder.play();
}

export default playRecording;
