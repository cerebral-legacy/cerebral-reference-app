function resetAssignments({module}) {
  const sceneIndex = module.state.get('currentSceneIndex');
  module.state.set(`scenes.${sceneIndex}.assignments`, []);
  module.state.set('assignmentsPositions', []);
}

export default resetAssignments;
