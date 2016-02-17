import pausePlaying from '../actions/pausePlaying';
import set from 'cerebral-addons/set';
import showSnackbar from 'common/factories/actions/showSnackbar';

export default [
  pausePlaying,
  set('state:/recorder.isBuffering', true),
  showSnackbar('Laster video...', true)
];
