import condition from 'common/factories/actions/condition';
import get from 'common/factories/actions/get';
import setUser from 'common/actions/setUser';
import set from 'common/factories/actions/set';
import redirect from 'common/factories/actions/redirect';
import showSnackbar from 'common/factories/actions/showSnackbar';

export default function(chain) {
  return [
    condition(['user', 'isLoggedIn']), {
      true: chain,
      false: [
        showSnackbar('Henter litt informasjon...'),
        set(['user', 'isLoading'], true),
        [
          get('/API/user', 'user'), {
            success: [
              setUser
            ].concat(chain),
            error: [
              set(['user', 'isLoading'], false),
              showSnackbar('Fant ikke brukeren!'),
              redirect('/')
            ]
          }
        ]
      ]
    }
  ];
}
