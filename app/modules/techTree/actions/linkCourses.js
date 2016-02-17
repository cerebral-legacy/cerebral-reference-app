function linkCourses({input, state}) {
  const selectedTierIndex = state.get('techTree.selectedTierIndex');
  const selectedCourse = state.get('techTree.selectedCourse');
  const selectedTierCursor = state.get(`techTree.tiers.${selectedTierIndex}`);
  const selectedCourseIndex = selectedTierCursor.get('courseDependencyList').findIndex((dependencyCourse) => {
    return selectedCourse.id === dependencyCourse.courseId;
  });
  const dependencyCourseIndex = selectedTierCursor.get('courseDependencyList').findIndex((dependencyCourse) => {
    return input.course.id === dependencyCourse.courseId;
  });

  let selectedCourseLevelIndex = null;
  let linkingCourseLevelIndex = null;
  let selectedCourseIsWithinOneLevel = false;
  let levelIndex = 0;

  state.get('techTree.courseDependencyMap').forEach((level) => {
    if (!level.centerLine && !level.sideLine) {
      const selectedCourseExistsInLevel = level.find((course) => {
        if (!course) {
          return false;
        }

        return course.courseId === selectedCourse.id;
      });
      const linkingCourseExistsInLevel = level.find((course) => {
        if (!course) {
          return false;
        }

        return course.courseId === input.course.id;
      });

      if (selectedCourseExistsInLevel) {
        selectedCourseLevelIndex = levelIndex;
      }

      if (linkingCourseExistsInLevel) {
        linkingCourseLevelIndex = levelIndex;
      }

      levelIndex++;
    }
  });

  if (selectedCourseLevelIndex > linkingCourseLevelIndex) {
    selectedCourseIsWithinOneLevel = selectedCourseLevelIndex - linkingCourseLevelIndex === 1 ||
    selectedCourseLevelIndex - linkingCourseLevelIndex === 2;
  } else {
    selectedCourseIsWithinOneLevel = linkingCourseLevelIndex - selectedCourseLevelIndex === 1 ||
    linkingCourseLevelIndex - selectedCourseLevelIndex === 2;
  }

  if (selectedCourseIsWithinOneLevel) {
    if (selectedCourseIndex > dependencyCourseIndex) {
      if (selectedTierCursor.get(`courseDependencyList.${dependencyCourseIndex}.requiredBy`).indexOf(selectedCourse.id) < 0) {
        selectedTierCursor.push(`courseDependencyList.${dependencyCourseIndex}.requiredBy`, selectedCourse.id);
      }

      if (selectedTierCursor.get(`courseDependencyList.${dependencyCourseIndex}.requiredBy`).indexOf(input.course.id) < 0) {
        selectedTierCursor.push(`courseDependencyList.${dependencyCourseIndex}.requiredBy`, input.course.id);
      }
    } else {
      if (selectedTierCursor.get(`courseDependencyList.${dependencyCourseIndex}.requiredBy`).indexOf(selectedCourse.id) < 0) {
        selectedTierCursor.push(`courseDependencyList.${dependencyCourseIndex}.requiredBy`, selectedCourse.id);
      }

      if (selectedTierCursor.get(`courseDependencyList.${dependencyCourseIndex}.requiredBy`).indexOf(input.course.id) < 0) {
        selectedTierCursor.push(`courseDependencyList.${dependencyCourseIndex}.requiredBy`, input.course.id);
      }
    }
  }
}

export default linkCourses;
