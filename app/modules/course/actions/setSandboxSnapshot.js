function setSandboxSnapshot({state}) {
  const currentSceneIndex = state.get('course.currentSceneIndex');
  const sandboxFiles = state.get(`course.scenes.${currentSceneIndex}.sandboxFiles`);

  state.set('course.sandboxSnapshot', sandboxFiles);
}

export default setSandboxSnapshot;
