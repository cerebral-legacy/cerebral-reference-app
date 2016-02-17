function redirectToLastCourse({services}) {
  const lastCourseId = services.localLastCourse.get();
  services.router.redirectToSignal('course.opened', {courseId: lastCourseId, sceneIndex: String(0)});
}

export default redirectToLastCourse;
