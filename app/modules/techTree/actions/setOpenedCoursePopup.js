function setOpenedCoursePopup({state, input}) {
  state.set('techTree.openedCoursePopup', {
    ...input
  });
}

export default setOpenedCoursePopup;
