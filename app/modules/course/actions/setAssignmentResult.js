function setAssignmentResult({input, state}) {
  state.merge('course.currentAssignmentStatus', {
    isLoading: false,
    result: input.result
  });
}

export default setAssignmentResult;
