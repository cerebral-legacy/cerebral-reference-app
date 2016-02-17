function getScene({input, state, output, services}) {
  const courseId = state.get('course.id');

  services.http.get(`/API/courses/${input.courseId || courseId}/scenes/${input.sceneIndex || 0}`)
    .then((response) => {
      output({
        scene: response.result
      });
    }).catch((err) => {
      output({
        sceneError: err.toString()
      });
    });
}

getScene.async = true;

export default getScene;
