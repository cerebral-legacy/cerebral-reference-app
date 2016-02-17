import redirectToMainAssignment from '../actions/redirectToMainAssignment';
import set from 'cerebral-addons/set';
import setMainAssignmentAsCourse from 'modules/mainAssignment/actions/setMainAssignmentAsCourse';

export default [
  setMainAssignmentAsCourse,
  set('state:/techTree.opened', false),
  set('state:/techTree.showMainAssignmentPopup', false),
  redirectToMainAssignment
];
