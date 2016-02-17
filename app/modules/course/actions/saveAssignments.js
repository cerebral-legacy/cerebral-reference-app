function saveAssignments({module, services, output}) {
  const courseId = module.state.get('id');
  const sceneIndex = module.state.get('currentSceneIndex');
  const assignments = module.state.get(`scenes.${sceneIndex}.assignments`);

  services.http.patch(`/API/courses/${courseId}/scenes/${sceneIndex}`, {
    assignments
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

saveAssignments.async = true;

export default saveAssignments;
