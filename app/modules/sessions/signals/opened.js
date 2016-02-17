import setPage from 'common/factories/actions/setPage.js';
import set from 'cerebral-addons/set';
import copy from 'cerebral-addons/copy';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import loadSessions from '../actions/loadSessions.js';

export default [
  setPage('sessions'),
  set('state:/sessions.isLoading', true),
  loadSessions, {
    success: [
      copy('input:/sessions', 'state:/sessions.sessionsList'),
      showSnackbar('Logger er lastet')
    ],
    error: [
      showSnackbar('Kunne ikke hente sesjoner!')
    ]
  }
];
