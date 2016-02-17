function setMousePosition({input, state, services}) {
  const leftColumnWidth = 300; // width + border

  let mousePositionX;
  let mousePositionY = input.mousePositionY;

  const sourceWidth = state.get('recorder.clientSize.width');
  const targetWidth = document.body.offsetWidth;
  const scaleFactor = (targetWidth - leftColumnWidth) / (sourceWidth - leftColumnWidth);

  /*
  const newYPositionDiff = state.get(['recorder', 'clientSize', 'height']) - document.body.offsetHeight;
  mousePositionY = input.mousePositionY + newYPositionDiff;
  */

  if (input.sandbox) { // Click happened in sandbox/preview window
    const iFramePosition = services.getIframePosition();
    mousePositionX = leftColumnWidth + ((iFramePosition.offsetLeft + input.mousePositionX - leftColumnWidth) * scaleFactor);
    // mousePositionY = input.mousePositionY + newYPositionDiff + iFramePosition.offsetTop;
    mousePositionY = input.mousePositionY + iFramePosition.offsetTop;
  } else if (input.mousePositionX < leftColumnWidth) { // Click happened within left column
    mousePositionX = input.mousePositionX;
  } else {
    mousePositionX = leftColumnWidth + ((input.mousePositionX - leftColumnWidth) * scaleFactor);
  }

  state.set('course.mousePosition', {
    x: mousePositionX,
    y: mousePositionY
  });
}

export default setMousePosition;
