function setSelectedTierIndex({state, input}) {
  const tierId = state.get('course.isInTier');
  let selectedTierIndex = state.get('techTree.tiers').findIndex((tier) => {
    return tier.id === tierId;
  });

  if (typeof input.tierIndex === 'number') {
    selectedTierIndex = input.tierIndex;
  }

  state.set('techTree.selectedTierIndex', selectedTierIndex === -1 ? 0 : selectedTierIndex);
}

export default setSelectedTierIndex;
