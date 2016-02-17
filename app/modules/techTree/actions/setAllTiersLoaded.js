function setAllTiersLoaded({state}) {
  const allTierIds = state.get('techTree.tiers').map((tier) => {
    return tier.id;
  });

  state.set('techTree.loadedTiers', allTierIds);
}

export default setAllTiersLoaded;
