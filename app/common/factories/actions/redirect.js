function redirect(url) {
  function action({services}) {
    services.router.redirect(url);
  }

  action.displayName = `redirect (${url})`;

  return action;
}

export default redirect;
