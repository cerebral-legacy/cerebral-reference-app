function removeFile({state, output}) {
  const currentSceneIndex = state.get('course.currentSceneIndex');
  const currentFileIndex = state.get(`course.scenes.${currentSceneIndex}.currentFileIndex`);
  const newFileIndex = currentFileIndex < 0 ? 0 : currentFileIndex - 1;

  state.splice(`course.scenes.${currentSceneIndex}.sandboxFiles`, currentFileIndex, 1);
  output({
    fileIndex: newFileIndex
  });
}

export default removeFile;
