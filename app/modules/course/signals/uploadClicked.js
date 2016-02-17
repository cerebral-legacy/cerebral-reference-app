import set from 'cerebral-addons/set';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  set('state:/course.recording.isUploading', true),
  showSnackbar('Lagrer video og lyd...', true)
];
