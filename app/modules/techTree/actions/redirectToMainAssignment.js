function redirectToSandbox({state, services}) {
  const userId = state.get('user.id');
  services.router.redirect('/mainassignment/' + userId);
}

export default redirectToSandbox;
