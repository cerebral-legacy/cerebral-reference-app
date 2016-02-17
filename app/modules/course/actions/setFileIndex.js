function setFileIndex({input, state}) {
  const currentSceneIndex = state.get('course.currentSceneIndex');

  state.set(`course.scenes.${currentSceneIndex}.currentFileIndex`, input.fileIndex);
}

export default setFileIndex;
