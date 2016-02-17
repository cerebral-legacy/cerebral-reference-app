import pausePlaying from '../actions/pausePlaying.js';
import canPause from '../actions/canPause.js';
import setLastPaused from '../actions/setLastPaused.js';
import setCurrentSeek from '../actions/setCurrentSeek';
import isAdminMode from '../actions/isAdminMode';
import setCurrentAssignmentByPausing from '../actions/setCurrentAssignmentByPausing';

export default [
  canPause, {
    true: [
      isAdminMode, {
        true: [],
        false: [
          setCurrentAssignmentByPausing
        ]
      },
      pausePlaying,
      setCurrentSeek,
      setLastPaused
    ],
    false: [
      setCurrentSeek,
      setLastPaused
    ]
  }
];
