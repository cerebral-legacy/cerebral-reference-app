import redirectToMainAssignment from '../actions/redirectToMainAssignment';
import set from 'cerebral-addons/set';
import setMainAssignmentAsCourse from 'modules/mainAssignment/actions/setMainAssignmentAsCourse';
import createMainAssignment from 'modules/mainAssignment/actions/createMainAssignment';
import getMainAssignment from 'modules/mainAssignment/actions/getMainAssignment';

export default [
  createMainAssignment, {
    success: [
      getMainAssignment, {
        success: [
          setMainAssignmentAsCourse,
          set('state:/techTree.showMainAssignmentPopup', false),
          redirectToMainAssignment
        ],
        error: []
      }
    ],
    error: []
  }
];
