function saveCourse({state, output, services}) {
  services.http.post('/API/courses', {
    course: state.get('courses.newCourse')
  })
  .then((response) => {
    output.success({id: response.result.id});
  })
  .catch(() => {
    output.error();
  });
}

saveCourse.async = true;

export default saveCourse;
