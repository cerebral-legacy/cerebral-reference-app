import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';

const model = Model({
  currentPage: 'course',
  snackbar: {
    show: false,
    text: '',
    persist: false
  },
  user: {
    isLoggedIn: false,
    isLoading: false,
    isAdmin: false,
    forceUser: false,
    assignmentsSolved: {}
  },
  session: {
    sessionId: null
  }
});

export default Controller(model);
