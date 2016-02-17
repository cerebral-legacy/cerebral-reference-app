function hideSnackbar({state}) {
  state.merge(['snackbar'], {
    text: '',
    show: false
  });
}

export default hideSnackbar;
