import set from 'cerebral-addons/set';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import saveRecording from '../actions/saveRecording.js';

export default [
  showSnackbar('Lagrer opptak...'),
  saveRecording, {
    success: [
      showSnackbar('Opptaket er nå lagret'),
      set('state:/recorder.isUploading', false),
      set('state:/recorder.hasRecorded', false)
    ],
    error: [
      showSnackbar('Det oppstod et problem med å lagre opptaket!')
    ]
  }
];
