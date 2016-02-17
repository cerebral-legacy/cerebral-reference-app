function closeAllPopovers({state}) {
  state.merge('course', {
    showFolder: false,
    showAssigment: false,
    showConfigureScenes: false,
    showScenesList: false
  });
}

export default closeAllPopovers;
