function login({state, services, output}) {
  const email = state.get('home.loginForm.email');
  const password = state.get('home.loginForm.password');

  services.http.post(`/API/login`, {
    email: email,
    password: password
  })
    .then(() => {
      output.success();
    }).catch(() => {
      output.error();
    });
}

login.async = true;

export default login;
