import saveSandboxChain from 'modules/course/chains/saveSandbox';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import saveMainAssignment from '../actions/saveMainAssignment';
import isAssignmentAuthor from '../actions/isAssignmentAuthor';

export default [
  ...saveSandboxChain,
  isAssignmentAuthor, {
    true: [
      saveMainAssignment, {
        success: [
          showSnackbar('Oppgaven er lagret')
        ],
        error: [
          showSnackbar('Det skjedde en feil med lagring av oppgaven!')
        ]
      }
    ],
    false: []
  }
];
