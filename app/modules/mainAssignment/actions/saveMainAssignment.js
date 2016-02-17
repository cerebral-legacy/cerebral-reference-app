function saveMainAssignment({services, output, state}) {
  const files = state.get('course.scenes.0.sandboxFiles');
  const userId = state.get('user.id');

  services.http.patch(`/API/mainAssignments/${userId}`, {
    files: files,
    authorName: state.get('mainAssignment.authorName') || state.get('techTree.authorName')
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

saveMainAssignment.async = true;

export default saveMainAssignment;
