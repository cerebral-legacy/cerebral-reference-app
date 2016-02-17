function showConsole({state}) {
  state.set('course.showPreview', false);
  state.set('course.showConsole', true);
}

export default showConsole;
