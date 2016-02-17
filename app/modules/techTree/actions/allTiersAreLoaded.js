function allTiersAreLoaded({output, state}) {
  const loadedTiers = state.get('techTree.loadedTiers');
  const allTierIds = state.get('techTree.tiers').map((tier) => {
    return tier.id;
  });

  if (allTierIds.length === loadedTiers.length) {
    output.true();
  } else {
    output.false();
  }
}

allTiersAreLoaded.outputs = ['true', 'false'];

export default allTiersAreLoaded;
