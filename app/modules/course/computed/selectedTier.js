export default function currentTier(get) {
  const selectedTierIndex = get(['techTree', 'selectedTierIndex']);

  if (typeof selectedTierIndex !== 'number') {
    return null;
  }

  return get(['techTree', 'tiers', selectedTierIndex]);
}
