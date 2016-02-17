function pausePlaying({state, services}) {
  state.merge('recorder', {
    isRecording: false,
    isPlaying: false,
    hasRecorded: false
  });
  services.recorder.pause();
}

export default pausePlaying;
