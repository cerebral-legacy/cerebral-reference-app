import set from 'cerebral-addons/set';
import registerSignup from './../actions/registerSignup.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import redirect from 'common/factories/actions/redirect';
import setUser from 'common/actions/setUser';

export default [
  set('state:/home.showSigningupLoader', true),
  registerSignup, {
    success: [
      setUser,
      redirect(
        process.env.NODE_ENV === 'production' ?
          '/courses/f644e54e-d6d1-44ae-ac97-ac5cea6be209/scenes/0'
        :
          '/courses'
        )
    ],
    error: [
      showSnackbar('Kunne ikke registrere din e-post')
    ]
  }
];
