function setActiveFile({input, state}) {
  const currentSceneIndex = state.get('course.currentSceneIndex');
  state.set(`course.scenes.${currentSceneIndex}.currentFileIndex`, input.index);
}

export default setActiveFile;
