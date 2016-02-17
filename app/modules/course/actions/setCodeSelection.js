function setCodeSelection({input, state}) {
  state.set('course.codeSelection', {
    anchor: input.anchor,
    head: input.head
  });
}

export default setCodeSelection;
