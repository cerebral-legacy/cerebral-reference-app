function updateDescriptionField({state, input}) {
  state.set(`courses.updatedDescription.${input.field}`, input.value);
}

export default updateDescriptionField;
