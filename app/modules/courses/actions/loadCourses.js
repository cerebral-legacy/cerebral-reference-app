function loadCourses({output, services}) {
  services.http.get('/API/courses')
  .then((response) => {
    output.success({courses: response.result});
  })
  .catch(() => {
    output.error();
  });
}

loadCourses.async = true;

export default loadCourses;
