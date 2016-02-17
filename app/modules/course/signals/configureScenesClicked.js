import set from 'cerebral-addons/set';
import closeAllPopovers from '../actions/closeAllPopovers.js';

export default [
  closeAllPopovers,
  set('state:/course.showConfigureScenes', true)
];
