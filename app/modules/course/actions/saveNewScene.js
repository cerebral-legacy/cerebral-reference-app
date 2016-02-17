function saveNewScene({state, output, services}) {
  const courseId = state.get('course.id');

  services.http.post(`/API/courses/${courseId}/scenes`, {
    name: state.get('course.newSceneName')
  })
  .then(output.success)
  .catch(output.error);
}

saveNewScene.async = true;

export default saveNewScene;
