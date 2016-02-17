function setMediaLoaded({state}) {
  state.merge('snackbar', {
    text: 'Video og lyd lastet!',
    show: true,
    persist: false
  });
  state.set('course.isLoadingMedia', false);
}

export default setMediaLoaded;
