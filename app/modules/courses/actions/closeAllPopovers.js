function closeAllPopovers({state}) {
  state.set('courses.showNewCourse', false);
  state.set('courses.showDescriptions', false);
}

export default closeAllPopovers;
