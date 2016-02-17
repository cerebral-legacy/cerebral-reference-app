function setCurrentSeek({input, state}) {
  if ('seek' in input) {
    state.set('recorder.currentSeek', [input.seek, Date.now()]);
  }
}

export default setCurrentSeek;
