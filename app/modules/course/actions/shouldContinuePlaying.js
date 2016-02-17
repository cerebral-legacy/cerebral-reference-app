function shouldContinuePlaying({input, state, output}) {
  if (input.continuePlaying) {
    output.true({
      seek: state.get('recorder.currentSeek')[0]
    });
  } else {
    output.false();
  }
}

shouldContinuePlaying.outputs = ['true', 'false'];

export default shouldContinuePlaying;
