function getMainAssignment({services, output, input, state}) {
  const userId = input.userId || state.get('user.id');

  services.http.get(`/API/mainAssignments/${userId}`)
    .then((response) => {
      output.success({
        mainAssignment: response.result
      });
    }).catch((e) => {
      console.log('error', e);
      output.error({
        courseError: 'Kunne ikke hente hovedoppgave'
      });
    });
}

getMainAssignment.async = true;

export default getMainAssignment;
