function addNewTier({state, input}) {
  state.push('techTree.tiers', input.tier);
}

export default addNewTier;
