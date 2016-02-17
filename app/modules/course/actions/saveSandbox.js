function saveSandbox({input, state, output, services}) {
  const currentSceneIndex = state.get('course.currentSceneIndex');
  const currentAssignmentIndex = state.get('course.currentAssignmentIndex');
  const assignment = state.get(`course.scenes.${currentSceneIndex}.assignments.${currentAssignmentIndex}`);
  const sandboxFiles = state.get('course.sandboxSnapshot');

  services.http.post(`/API/sandbox?id=${input.requestId}`, {
    files: sandboxFiles,
    assignment: input.runAssigment && assignment ? assignment.code : null
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error({
      message: 'Could not save sandbox files'
    });
  });
}

export default saveSandbox;
