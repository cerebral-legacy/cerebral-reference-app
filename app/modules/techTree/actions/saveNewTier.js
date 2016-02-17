function saveNewTier({state, services, output}) {
  services.http.post('/API/tiers', {
    name: state.get('techTree.newTierName')
  })
  .then((response) => {
    output.success({tier: response.result.tier});
  })
  .catch((e) => {
    console.log('Could not create tier', e);
    output.error(e);
  });
}

saveNewTier.async = true;

export default saveNewTier;
