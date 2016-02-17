function setTierCoursesLoaded({state, input}) {
  const tierId = state.get('course.isInTier');
  let selectedTierIndex = state.get('techTree.tiers').findIndex((tier) => {
    return tier.id === tierId;
  });

  if (typeof input.tierIndex === 'number') {
    selectedTierIndex = input.tierIndex;
  }
  const selectedTierId = state.get(`techTree.tiers.${selectedTierIndex}.id`);

  state.push('techTree.loadedTiers', selectedTierId);
}

export default setTierCoursesLoaded;
