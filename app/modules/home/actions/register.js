function register({services, output, state}) {
  const email = state.get('home.registerForm.email');
  const password = state.get('home.registerForm.password');
  const repeatedPassword = state.get('home.registerForm.repeatedPassword');

  if (password !== repeatedPassword) {
    output.error({message: 'Passordene er ikke like.'});
  } else {
    services.http.post('/API/registerSignup', {
      email: email,
      password: password
    })
    .then(() => {
      output.success();
    })
    .catch((e) => {
      let errorMessage = 'Registrering feilet.';

      if (e.message === 'USER_EXISTS') {
        errorMessage = 'Brukeren finnes allerede.';
      }
      output.error({message: errorMessage});
    });
  }
}

register.async = true;

export default register;
