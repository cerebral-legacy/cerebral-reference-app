import showSnackbar from 'common/factories/actions/showSnackbar.js';

function createSession(name, chain) {
  function createSessionId({services, output}) {
    services.http.post('/API/sessions')
    .then((response) => {
      output.success({sessionId: response.result.sessionId});
    })
    .catch((e) => {
      console.log('Could not create session', e);
      output.error(e);
    });
  }

  createSessionId.async = true;

  function setSessionId({input, state}) {
    state.set(['session', 'sessionId'], input.sessionId);
  }

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

  return [
    createSessionId, {
      success: [
        setSessionId,
        trackData, {
          success: [],
          error: []
        }
      ].concat(chain),
      error: [
        showSnackbar('An error occured, please try again...')
      ]
    }
  ];
}

export default createSession;
