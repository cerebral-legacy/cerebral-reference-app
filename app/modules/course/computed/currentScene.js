export default function currentScene(get) {
  const sceneIndex = get(['course', 'currentSceneIndex']);
  const scenes = get(['course', 'scenes']);

  return Object.assign({index: Number(sceneIndex)}, scenes[sceneIndex]);
}
