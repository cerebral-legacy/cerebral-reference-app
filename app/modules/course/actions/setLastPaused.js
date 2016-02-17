function setLastPaused({state}) {
  state.merge('recorder', {
    lastPaused: Date.now()
  });
}

export default setLastPaused;
