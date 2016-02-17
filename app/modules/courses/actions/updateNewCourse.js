function updateNewCourseName({input, state}) {
  state.set(`courses.newCourse.${input.field}`, input.value);
}

export default updateNewCourseName;
