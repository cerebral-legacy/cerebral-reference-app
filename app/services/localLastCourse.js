export default {
  set(id) {
    localStorage.setItem('lastCourse', JSON.stringify(id));
  },
  get() {
    return JSON.parse(localStorage.getItem('lastCourse'));
  }
};
