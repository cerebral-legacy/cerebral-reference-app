function setUser({input, state}) {
  state.merge(['user'], {
    ...input.user,
    isLoggedIn: true,
    isLoading: false
  });
}

export default setUser;
