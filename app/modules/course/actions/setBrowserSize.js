function setBrowserSize({state}) {
  state.set('recorder.clientSize', {
    width: document.body.offsetWidth,
    height: document.body.offsetHeight
  });
}

export default setBrowserSize;
