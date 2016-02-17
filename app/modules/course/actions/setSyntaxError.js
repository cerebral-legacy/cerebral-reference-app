function setSyntaxError({state}) {
  state.merge('course.currentAssignmentStatus', {
    result: 'Du har skrivefeil i koden. Har du et element som ikke er lukket?',
    isSyntaxError: true
  });
}

export default setSyntaxError;
