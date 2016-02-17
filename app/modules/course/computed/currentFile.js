import currentScene from './currentScene';

export default function currentFile(get) {
  const scene = get(currentScene);

  if (!scene || !scene.sandboxFiles) {
    return null;
  }

  return scene.sandboxFiles[scene.currentFileIndex];
}
