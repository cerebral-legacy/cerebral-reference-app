function setCourse({input, state, services}) {
  services.localLastCourse.set(input.course.id);
  state.merge('course', input.course);
  state.set('course.scenesList', input.course.scenes.map((scene) => {
    return {
      name: scene.name,
      assignmentsCount: scene.assignments.length
    };
  }));
}

export default setCourse;
