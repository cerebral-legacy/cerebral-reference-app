function redirectToScene({input, state, services}) {
  const courseId = state.get('course.id');
  services.router.redirect(`/courses/${courseId}/scenes/${input.sceneIndex}`);
}

export default redirectToScene;
