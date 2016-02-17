import {transformCode as transformCode} from 'common/utils.js';

function codeChanged({input, state}) {
  const isOwner = state.get('course.authorId') === state.get('user.id');
  const isRecording = state.get('recorder.isRecording');
  const isPlaying = state.get('recorder.isPlaying');
  const currentSceneIndex = state.get('course.currentSceneIndex');
  const currentFileIndex = state.get(`course.scenes.${currentSceneIndex}.currentFileIndex`);

  const sandboxFileCursor = state.select(`course.scenes.${currentSceneIndex}.sandboxFiles.${currentFileIndex}`);
  let code = sandboxFileCursor.get('code');
  code = transformCode(code, input);

  if (isOwner && !isRecording && !isPlaying) {
    state.set(`course.scenes.${currentSceneIndex}.files.${currentFileIndex}.code`, code);
  }

  sandboxFileCursor.set('code', code);
  state.set('course.lastEvent', event);
  state.set('course.verifyingCode', true);
}

export default codeChanged;
