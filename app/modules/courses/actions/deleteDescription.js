function deleteDescription({services, input, output}) {
  services.http.delete('/api/descriptions/' + input.tagName)
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

deleteDescription.async = true;

export default deleteDescription;
