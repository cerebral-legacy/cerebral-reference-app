function setSeek({input, state, services}) {
  const fullSecond = Math.floor(input.seek / 1000) * 1000;
  const recorderCursor = state.select('recorder');
  recorderCursor.set('isRecording', true);

  if (recorderCursor.get('isPlaying')) {
    services.recorder.pause();
    services.recorder.seek(fullSecond);
    services.recorder.play();
  } else {
    services.recorder.seek(fullSecond);
  }
  recorderCursor.set('isRecording', false);
}

export default setSeek;
