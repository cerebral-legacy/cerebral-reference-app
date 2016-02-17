function removeSyntaxError({state}) {
  if (state.get('course.currentAssignmentStatus.isSyntaxError')) {
    state.merge('course.currentAssignmentStatus', {
      result: null,
      isSyntaxError: false
    });
  }
}

export default removeSyntaxError;
