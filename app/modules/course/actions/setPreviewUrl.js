function setPreviewUrl({state, output}) {
  const requestId = String(Date.now());
  const url = process.env.SANDBOX_URL;
  state.set('course.previewUrl', `${url}?id=${requestId}`);
  output({
    requestId: requestId
  });
}

export default setPreviewUrl;
