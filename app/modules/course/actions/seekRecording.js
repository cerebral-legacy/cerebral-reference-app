function seekRecording({input, state, services}) {
  const seek = input.seek || 0;
  state.set('recorder.isRecording', true);
  services.recorder.seek(seek);
  state.set('recorder.isRecording', false);
}

export default seekRecording;
