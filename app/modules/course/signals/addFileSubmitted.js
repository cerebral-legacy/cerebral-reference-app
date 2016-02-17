import addNewFile from './../actions/addNewFile.js';
import setActiveFile from './../actions/setActiveFile.js';
import set from 'cerebral-addons/set';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  addNewFile,
  setActiveFile,
  set('state:/course.showFolder', false),
  set('state:/course.newFileName', ''),
  showSnackbar('Fil opprettet!')
];
