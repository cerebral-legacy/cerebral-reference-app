import copy from 'cerebral-addons/copy';
import toggle from 'cerebral-addons/toggle';
import closeAllPopovers from '../actions/closeAllPopovers';

export default [
  copy('state:/course.showScenesList', 'output:/showScenesList'),
  closeAllPopovers,
  toggle('state:/course.showScenesList')
];
