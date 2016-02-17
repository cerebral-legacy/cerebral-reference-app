function setPage(page) {
  function action({state}) {
    state.set('currentPage', page);
  }

  action.displayName = 'setPage';

  return action;
}

export default setPage;
