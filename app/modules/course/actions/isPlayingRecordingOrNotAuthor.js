function isPlayingRecordingOrNotAuthor({state, output}) {
  if (
    state.get('recorder.isPlaying') ||
    state.get('recorder.isRecording') ||
    state.get('user.id') !== state.get('course.authorId')
  ) {
    output.true();
  } else {
    output.false();
  }
}

isPlayingRecordingOrNotAuthor.outputs = ['true', 'false'];

export default isPlayingRecordingOrNotAuthor;
