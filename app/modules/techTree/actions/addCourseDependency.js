function setCourseDependency({state, input}) {
  const selectedTierIndex = state.get('techTree.selectedTierIndex');
  const selectedCourse = state.get('techTree.selectedCourse');
  const selectedTierCursor = state.get(`techTree.tiers.${selectedTierIndex}`);

  if (!selectedCourse) {
    // Starting point
    selectedTierCursor.push('courseDependencyList', {
      courseId: input.course.id,
      requires: [],
      requiredBy: []
    });
  } else {
    selectedTierCursor.push('courseDependencyList', {
      courseId: input.course.id,
      requires: [selectedCourse.id],
      requiredBy: []
    });

    const selectedCourseIndex = selectedTierCursor.get('courseDependencyList').findIndex((course) => {
      return course.courseId === selectedCourse.id;
    });

    selectedTierCursor.push(`courseDependencyList.${selectedCourseIndex}.requiredBy`, input.course.id);
  }
}

export default setCourseDependency;
