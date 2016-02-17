function removeDescriptionFromList({input, state}) {
  const descriptions = state.get('courses.descriptions');
  const index = descriptions.findIndex((description) => {
    return description.tagName === input.tagName;
  });

  state.splice('courses.descriptions', index, 1);
}

export default removeDescriptionFromList;
