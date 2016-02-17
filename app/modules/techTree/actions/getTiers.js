function getTiers({services, output}) {
  services.http.get('/API/tiers')
  .then((response) => {
    output.success({tiers: response.result});
  })
  .catch((e) => {
    console.log('Could not get tiers', e);
    output.error(e);
  });
}

export default getTiers;
