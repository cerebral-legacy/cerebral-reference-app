function isAdminMode({state, output}) {
  const user = state.get('user');

  if (user.isAdmin && !user.forceUser) {
    output.true();
  } else {
    output.false();
  }
}

isAdminMode.outputs = ['true', 'false'];

export default isAdminMode;
