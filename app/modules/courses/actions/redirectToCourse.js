function redirectToCourse({input, services}) {
  services.router.redirect(`/courses/${input.id}/scenes/0`);
}

export default redirectToCourse;
