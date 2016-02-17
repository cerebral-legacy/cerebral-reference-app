function hasLoadedDescriptions({state, output}) {
  state.get('descriptions.list').length === 0 ? output.false() : output.true();
}

hasLoadedDescriptions.outputs = ['true', 'false'];

export default hasLoadedDescriptions;
