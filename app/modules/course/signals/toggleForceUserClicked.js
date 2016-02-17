import set from 'cerebral-addons/set';
import toggleForceUser from '../actions/toggleForceUser';
import when from 'cerebral-addons/when';
import setInput from 'common/factories/actions/setInput';
import setCurrentSeek from '../actions/setCurrentSeek';
import setSeek from '../actions/setSeek';

export default [
  toggleForceUser,
  when('state:/user.forceUser'), {
    isTrue: [
      set('state:/course.currentAssignmentIndex', -1)
    ],
    isFalse: [
      set('state:/course.currentAssignmentIndex', -1),
      setInput('seek', 0),
      setCurrentSeek,
      setSeek
    ]
  }
];
