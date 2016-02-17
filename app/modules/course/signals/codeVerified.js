import set from 'cerebral-addons/set';
import when from 'cerebral-addons/when';
import setSyntaxError from '../actions/setSyntaxError';
import removeSyntaxError from '../actions/removeSyntaxError';

export default [
  when('input:/hasError'), {
    isTrue: [
      setSyntaxError
    ],
    isFalse: [
      removeSyntaxError
    ]
  },
  set('state:/course.verifyingCode', false)
];
