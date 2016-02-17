import set from 'cerebral-addons/set';
import closeAllPopovers from '../actions/closeAllPopovers';

export default [
  closeAllPopovers,
  set('state:/courses.showNewCourse', true)
];
