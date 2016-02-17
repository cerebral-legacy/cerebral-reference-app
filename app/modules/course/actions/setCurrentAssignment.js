function setCurrentAssignment({input, module}) {
  const assignmentsPositions = module.state.get('assignmentsPositions');
  const currentAssignmentIndex = assignmentsPositions.reduce((currentIndex, position, index) => {
    if (input.seek > position) {
      return index;
    }

    return currentIndex;
  }, -1);

  module.state.set('currentAssignmentIndex', currentAssignmentIndex);
}

export default setCurrentAssignment;
