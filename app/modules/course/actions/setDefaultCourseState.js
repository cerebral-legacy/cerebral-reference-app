function setDefaultCourseState({state}) {
  state.merge('course', {
    name: '',
    isLoading: false,
    authorId: state.get(['user', 'id']),
    showPreview: true,
    showConsole: false,
    showEditAssignment: false,
    showAssignment: false,
    showConfigureScenes: false,
    showScenesList: false,
    showFolder: false,
    showAddFileInput: false,
    currentSceneIndex: 0,
    sandboxSnapshot: null,
    scenes: []
  });
}

export default setDefaultCourseState;
