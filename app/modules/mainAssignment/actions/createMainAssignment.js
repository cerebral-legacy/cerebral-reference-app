function createMainAssignment({services, output, state}) {
  const userId = state.get('user.id');

  services.http.patch(`/API/mainAssignments/${userId}`, {
    authorName: state.get('techTree.authorName')
  })
  .then(() => {
    output.success({
      userId: userId
    });
  })
  .catch(() => {
    output.error();
  });
}

createMainAssignment.async = true;

export default createMainAssignment;
