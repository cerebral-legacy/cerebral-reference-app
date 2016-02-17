import currentScene from '../computed/currentScene';

function hasRecordedScene({state, output}) {
  const scene = state.get(currentScene);

  if (scene.recording) {
    output.true();
  } else {
    output.false();
  }
}

hasRecordedScene.outputs = ['true', 'false'];

export default hasRecordedScene;
