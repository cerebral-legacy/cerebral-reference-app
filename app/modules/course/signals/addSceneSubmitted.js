import saveNewScene from './../actions/saveNewScene.js';
import addNewScene from './../actions/addNewScene.js';
import setScene from './../actions/setScene.js';
import set from 'cerebral-addons/set';
import copy from 'cerebral-addons/copy';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  set('state:/course.showConfigureScenes', false),
  showSnackbar('Lagrer scene...'),
  saveNewScene, {
    success: [
      addNewScene,
      copy('input:/sceneIndex', 'state:/course.currentSceneIndex'),
      setScene,
      showSnackbar('Scene was saved and loaded')
    ],
    error: [
      showSnackbar('Could not save new scene!')
    ]
  }
];
