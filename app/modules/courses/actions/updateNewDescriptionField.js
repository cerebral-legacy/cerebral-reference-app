function updateNewDescriptionField({state, input}) {
  state.set(`courses.newDescription.${input.field}`, input.value);
}

export default updateNewDescriptionField;
