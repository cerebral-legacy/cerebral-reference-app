function getCourseIndex(courses, courseId) {
  return courses.findIndex((course) => {
    return course.id === courseId;
  });
}

function updateCourses({input, state}) {
  const courses = state.get('techTree.courses');

  input.courses.forEach((course) => {
    const originalCourse = state.findWhere('techTree.courses', {id: course.id});
    const courseIndex = getCourseIndex(courses, course.id);

    if (originalCourse) {
      state.merge(`techTree.courses.${courseIndex}`, course);
    } else {
      state.push('techTree.courses', course);
    }
  });
}

export default updateCourses;
