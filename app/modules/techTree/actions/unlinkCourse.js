function unlinkCourse({input, state}) {
  const selectedTierIndex = state.get('techTree.selectedTierIndex');
  const dependencyListCursor = state.get(`techTree.tiers.${selectedTierIndex}.courseDependencyList`);

  const removingCourseIndex = dependencyListCursor.get().findIndex((course) => {
    return input.course.id === course.courseId;
  });

  dependencyListCursor.get(`${removingCourseIndex}.requires`).forEach((courseId) => {
    const requiresCourse = dependencyListCursor.get().find((course) => {
      return course.courseId === courseId;
    });
    const courseIndex = dependencyListCursor.get()
      .findIndex((dependencyCourse) => {
        return dependencyCourse.courseId === requiresCourse.courseId;
      });
    const removingCourseRequiredByIndex = dependencyListCursor.get(`${courseIndex}.requiredBy`)
      .findIndex((requiredByCourseId) => {
        return requiredByCourseId === input.courseId;
      });

    dependencyListCursor.splice(`${courseIndex}.requiredBy`, removingCourseRequiredByIndex, 1);
  });

  state.splice(`techTree.tiers.${selectedTierIndex}.courseDependencyList`, removingCourseIndex, 1);
}

export default unlinkCourse;
