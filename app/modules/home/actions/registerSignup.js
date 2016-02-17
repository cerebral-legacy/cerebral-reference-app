function registerSignup({input, output, services}) {
  services.http.post('/API/registerSignup', {
    email: input.email
  })
  .then((response) => {
    output.success({
      user: response.result
    });
  })
  .catch(() => {
    output.error();
  });
}

registerSignup.async = true;

export default registerSignup;
