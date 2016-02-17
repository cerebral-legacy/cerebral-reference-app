function setSelectedDescription({state, input}) {
  const updatedDescriptionCursor = state.get('courses.updatedDescription');

  if (input.description) {
    state.set('courses.selectedDescription', input.description.tagName);
  } else {
    state.set('courses.selectedDescription', null);
  }
  updatedDescriptionCursor.set('tagName', input.description.tagName);
  updatedDescriptionCursor.set('description', input.description.description);
  updatedDescriptionCursor.set('exampleType', input.description.exampleType);
  updatedDescriptionCursor.set('example', input.description.example);
}

export default setSelectedDescription;
