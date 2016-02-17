import copy from 'cerebral-addons/copy';
import set from 'cerebral-addons/set';
import closeAllPopovers from 'modules/courses/actions/closeAllPopovers';

export default [
  copy('input:/course', 'state:/techTree.selectedCourse'),
  set('state:/techTree.openedCoursePopup', null),
  closeAllPopovers,
  set('state:/techTree.showMainAssignmentPopup', false)
];
