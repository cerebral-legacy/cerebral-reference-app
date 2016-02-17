function resetNewDescriptionFields({state}) {
  state.set('courses.newDescription', {
    tagName: '',
    description: '',
    exampleType: 'HTML',
    example: ''
  });
}

export default resetNewDescriptionFields;
