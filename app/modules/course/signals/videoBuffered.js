import playRecording from '../actions/playRecording';
import showSnackbar from 'common/factories/actions/showSnackbar';
import shouldContinuePlaying from '../actions/shouldContinuePlaying';
import seekRecording from '../actions/seekRecording';
import set from 'cerebral-addons/set';

export default [
  showSnackbar('Video lastet!'),
  set('state:/recorder.isBuffering', false),
  shouldContinuePlaying, {
    true: [
      seekRecording,
      playRecording
    ],
    false: []
  }
];
