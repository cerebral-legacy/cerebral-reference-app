function getDescriptions({services, output}) {
  services.http.get('/API/descriptions')
  .then((response) => {
    output.success({descriptions: response.result});
  })
  .catch(() => {
    output.error();
  });
}

getDescriptions.async = true;

export default getDescriptions;
