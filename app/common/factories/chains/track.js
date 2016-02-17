function isPlaying({state, output}) {
  if (state.get(['recorder', 'isPlaying'])) {
    output.true();
  } else {
    output.false();
  }
}

isPlaying.outputs = ['true', 'false'];

function track(name, chain) {
  function trackData({input, state, output, services}) {
    const sessionId = state.get(['session', 'sessionId']);
    services.http.post(`/API/sessions/${sessionId}`, {
      name: name,
      input: input
    })
    .then(() => {
      output.success();
    })
    .catch((e) => {
      output.error(e);
    });
  }

  trackData.async = true;

  return chain.concat([
    isPlaying, {
      true: [],
      false: [
        trackData, {
          success: [],
          error: []
        }
      ]
    }
  ]);
}

export default track;
