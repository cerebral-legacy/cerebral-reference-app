function loadSessions({output, services}) {
  services.http.get(`/API/sessions`)
    .then((response) => {
      output.success({
        sessions: response.result
      });
    })
    .catch(() => {
      output.error({
        message: 'Could not get sessions'
      });
    });
}

loadSessions.async = true;

export default loadSessions;
