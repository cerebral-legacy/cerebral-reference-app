function getAllCourses({output, services}) {
  services.http.get('/API/courses')
  .then((response) => {
    output.success({courses: response.result});
  })
  .catch(() => {
    output.error();
  });
}

export default getAllCourses;
