import set from 'cerebral-addons/set';
import setLoadingAssignment from '../actions/setLoadingAssignment.js';
import saveSandboxChain from '../chains/saveSandbox';
import assignmentSolved from '../actions/assignmentSolved';

export default [
  assignmentSolved, {
    true: [...saveSandboxChain],
    false: [
      set('state:/course.currentAssignmentStatus.result', false),
      setLoadingAssignment,
      ...saveSandboxChain
    ]
  }
];
