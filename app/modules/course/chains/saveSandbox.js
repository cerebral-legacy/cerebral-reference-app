import saveSandbox from '../actions/saveSandbox';
import setPreviewUrl from '../actions/setPreviewUrl';
import set from 'cerebral-addons/set';
import setSandboxSnapshot from '../actions/setSandboxSnapshot';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  setSandboxSnapshot,
  setPreviewUrl,
  set('state:/course.isLoadingPreview', true),
  [
    saveSandbox, {
      success: [
        set('state:/course.isLoadingPreview', false)
      ],
      error: [
        showSnackbar('An error occured, please try again...')
      ]
    }
  ]
];
