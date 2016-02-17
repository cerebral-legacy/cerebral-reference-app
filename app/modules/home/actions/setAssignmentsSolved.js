function setAssignmentsSolved({state, services}) {
  state.set('user.assignmentsSolved', services.localAssignments.getAll());
}

export default setAssignmentsSolved;
