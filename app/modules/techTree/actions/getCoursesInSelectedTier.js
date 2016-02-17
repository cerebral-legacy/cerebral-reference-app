function getCoursesInSelectedTier({services, state, output, input}) {
  let selectedTierIndex = 0;
  const tierId = state.get('course.isInTier');

  if (typeof input.tierIndex === 'number') {
    selectedTierIndex = input.tierIndex;
  } else if (tierId) {
    selectedTierIndex = state.get('techTree.tiers').findIndex((tier) => {
      return tier.id === tierId;
    });
  }

  const selectedTierId = state.get(`techTree.tiers.${selectedTierIndex}.id`);

  services.http.get(`/API/tiers/${selectedTierId}/courses`)
  .then((response) => {
    output.success({courses: response.result});
  })
  .catch(() => {
    output.error();
  });
}

getCoursesInSelectedTier.async = true;

export default getCoursesInSelectedTier;
