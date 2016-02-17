function tiersExists({state, output}) {
  if (state.get('techTree.tiers').length) {
    output.true();
  } else {
    output.false();
  }
}

tiersExists.outputs = ['true', 'false'];

export default tiersExists;
