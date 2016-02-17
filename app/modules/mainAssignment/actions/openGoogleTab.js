function openGoogleTab({state}) {
  const googleInput = state.get('mainAssignment.googleInput');
  window.open('https://www.google.no/?#q=' + googleInput, '_blank');
}

export default openGoogleTab;
