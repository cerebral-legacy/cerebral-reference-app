import seekRecording from '../actions/seekRecording.js';
import setCurrentSeek from '../actions/setCurrentSeek.js';
import saveSandbox from '../chains/saveSandbox.js';
import playRecording from '../actions/playRecording.js';

export default [
  seekRecording,
  setCurrentSeek,
  playRecording,
  ...saveSandbox
];
