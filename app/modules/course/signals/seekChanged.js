import setSeek from '../actions/setSeek';
import setCurrentSeek from '../actions/setCurrentSeek.js';
import saveSandbox from '../chains/saveSandbox.js';
import setCurrentAssignment from '../actions/setCurrentAssignment';
import isAdminMode from '../actions/isAdminMode';

export default [
  isAdminMode, {
    true: [
      setCurrentAssignment
    ],
    false: [
      setSeek,
      setCurrentSeek,
      setCurrentAssignment,
      ...saveSandbox
    ]
  }
];
