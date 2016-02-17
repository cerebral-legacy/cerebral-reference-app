import setPage from 'common/factories/actions/setPage';
import set from 'cerebral-addons/set';
import copy from 'cerebral-addons/copy';
import loadCourses from '../actions/loadCourses';
import showSnackbar from 'common/factories/actions/showSnackbar';

export default [
  setPage('courses'),
  set('state:/courses.isLoading', true),
  loadCourses, {
    success: [copy('input:/courses', 'state:/courses.courses')],
    error: [showSnackbar('Det oppstod en feil ved henting av kurs!')]
  },
  set('state:/courses.isLoading', false)
];
