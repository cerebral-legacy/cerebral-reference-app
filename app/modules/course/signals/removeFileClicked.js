import removeFile from '../actions/removeFile.js';
import setFileIndex from '../actions/setFileIndex.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  removeFile,
  setFileIndex,
  showSnackbar('Filen ble slettet')
];
