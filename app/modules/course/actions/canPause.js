function canPause({state, output}) {
  const lastPaused = state.get('recorder.lastPaused');
  const isRecording = state.get('recorder.isRecording');

  if (isRecording || Date.now() - lastPaused < 1000) {
    output.false();
  } else {
    output.true();
  }
}

canPause.outputs = ['true', 'false'];

export default canPause;
