import set from 'cerebral-addons/set';
import login from '../actions/login';
import redirectToLastCourse from '../actions/redirectToLastCourse';

export default [
  set('state:/home.isLoggingIn', true),
  set('state:/home.loginErrorMessage', null),
  login, {
    success: [
      redirectToLastCourse
    ],
    error: [
      set('state:/home.loginErrorMessage', 'Innlogging feilet! Har du tastet riktig e-post og passord?')
    ]
  },
  set('state:/home.isLoggingIn', false)
];
