function toggleForceUser({state}) {
  state.set('user.forceUser', !state.get('user.forceUser'));
}

export default toggleForceUser;
