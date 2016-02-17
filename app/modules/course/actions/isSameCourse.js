function isSameCourse({input, state, output}) {
  if (input.courseId === state.get('course.id')) {
    output.true();
  } else {
    output.false();
  }
}

isSameCourse.outputs = ['true', 'false'];

export default isSameCourse;
