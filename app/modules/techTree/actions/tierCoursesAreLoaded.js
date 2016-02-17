function tierCoursesAreLoaded({state, output, input}) {
  const loadedTiers = state.get('techTree.loadedTiers');
  const tierId = state.get('course.isInTier');
  let selectedTierIndex = state.get('techTree.tiers').findIndex((tier) => {
    return tier.id === tierId;
  });

  if (typeof input.tierIndex === 'number') {
    selectedTierIndex = input.tierIndex;
  }
  const selectedTierId = state.get(`techTree.tiers.${selectedTierIndex}.id`);

  if (loadedTiers.indexOf(selectedTierId) >= 0) {
    output.true();
  } else {
    output.false();
  }
}

tierCoursesAreLoaded.outputs = ['true', 'false'];

export default tierCoursesAreLoaded;
