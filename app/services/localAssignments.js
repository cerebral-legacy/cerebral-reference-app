export default {
  getAll() {
    return JSON.parse(localStorage.getItem('assignmentsSolved') || '{}');
  },
  get(courseId, sceneId) {
    const assignments = JSON.parse(localStorage.getItem('assignmentsSolved') || '{}');

    if (assignments[courseId]) {
      return assignments[courseId][sceneId] || 0;
    }

    return 0;
  },
  set(courseId, sceneId, assignmentsSolvedCount) {
    const assignments = JSON.parse(localStorage.getItem('assignmentsSolved') || '{}');

    assignments[courseId] = assignments[courseId] || {};
    assignments[courseId][sceneId] = assignmentsSolvedCount;
    localStorage.setItem('assignmentsSolved', JSON.stringify(assignments));

    return assignments;
  },
  reset() {
    localStorage.setItem('assignmentsSolved', '{}');

    return {};
  },
  setFake(courseId, sceneId, assignmentsSolvedCount) {
    return {
      [courseId]: {
        [sceneId]: assignmentsSolvedCount
      }
    };
  }
};
