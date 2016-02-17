function setExampleType({state, input}) {
  state.set(`courses.${input.field}.exampleType`, input.value);
}

export default setExampleType;
