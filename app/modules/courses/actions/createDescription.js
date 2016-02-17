function createDescription({state, services, output}) {
  services.http.post(`/API/descriptions`, {
    tagName: state.get('courses.newDescription.tagName'),
    description: state.get('courses.newDescription.description'),
    exampleType: state.get('courses.newDescription.exampleType'),
    example: state.get('courses.newDescription.example')
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error({
      message: 'Could not save description'
    });
  });
}

createDescription.async = true;

export default createDescription;
