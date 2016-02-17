import authenticate from 'common/factories/chains/authenticate';
import track from 'common/factories/chains/track';
import createSession from 'common/factories/chains/createSession';

import opened from './signals/opened';
import appClicked from './signals/appClicked';
import addFileClicked from './signals/addFileClicked';
import codeChanged from './signals/codeChanged';
import showPreviewClicked from './signals/showPreviewClicked';
import showConsoleClicked from './signals/showConsoleClicked';
import fileClicked from './signals/fileClicked';
import addFileAborted from './signals/addFileAborted';
import assignmentCodeChanged from './signals/assignmentCodeChanged';
import assignmentDescriptionChanged from './signals/assignmentDescriptionChanged';
import addFileSubmitted from './signals/addFileSubmitted';
import recordClicked from './signals/recordClicked';
import stopClicked from './signals/stopClicked';
import playClicked from './signals/playClicked';
import saveSceneClicked from './signals/saveSceneClicked';
import configureScenesClicked from './signals/configureScenesClicked';
import addSceneSubmitted from './signals/addSceneSubmitted';
import sceneNameClicked from './signals/sceneNameClicked';
import listSceneNameClicked from './signals/listSceneNameClicked';
import uploadClicked from './signals/uploadClicked';
import uploadFinished from './signals/uploadFinished';
import uploadFailed from './signals/uploadFailed';
import removeFileClicked from './signals/removeFileClicked';
import newSceneNameChanged from './signals/newSceneNameChanged';
import sandboxTested from './signals/sandboxTested';
import addFileNameUpdated from './signals/addFileNameUpdated';
import pauseClicked from './signals/pauseClicked';
import mediaLoaded from './signals/mediaLoaded';
import videoStartedBuffering from './signals/videoStartedBuffering';
import videoFailed from './signals/videoFailed';
import codeCursorChanged from './signals/codeCursorChanged';
import seekChanged from './signals/seekChanged';
import buttonPopoverClicked from './signals/buttonPopoverClicked';
import sandboxClicked from './signals/sandboxClicked';
import videoBuffered from './signals/videoBuffered';
import toggleForceUserClicked from './signals/toggleForceUserClicked';
import runAssignmentClicked from './signals/runAssignmentClicked';
import tagNameMouseOver from './signals/tagNameMouseOver';
import tagNameMouseOut from './signals/tagNameMouseOut';
import descriptionHovered from './signals/descriptionHovered';
import assignmentStatusClosed from './signals/assignmentStatusClosed';
import assignmentStatusOpened from './signals/assignmentStatusOpened';
import continueCourseClicked from './signals/continueCourseClicked';
import codeVerified from './signals/codeVerified';

export default () => {
  return (module) => {
    module.addState({
      id: null,
      name: 'Course 1',
      mousePosition: {
        x: 0,
        y: 0
      },
      isLoading: true,
      currentAssignmentStatus: {
        isLoading: false,
        result: null
      },
      showAssignmentStatus: false,
      assignmentsPositions: [],
      isLoadingMedia: false,
      authorId: null,
      showPreview: true,
      showConsole: false,
      showEditAssignment: false,
      showAssignment: false,
      tooltip: {
        visible: null,
        timeout: null
      },
      showConfigureScenes: false,
      showScenesList: false,
      showFolder: false,
      showAddFileInput: false,
      currentSceneIndex: 0,
      currentAssignmentIndex: -1,
      sandboxSnapshot: null,
      verifyingCode: false,
      newSceneName: '',
      newFileName: '',
      codeSelection: {
        anchor: {ch: 0, line: 0},
        head: {ch: 0, line: 0}
      },
      scenes: [],
      scenesList: []
    });

    module.addSignals({
      opened: createSession('course.opened', authenticate(opened)),
      addFileClicked: track('course.addFileClicked', addFileClicked),
      showPreviewClicked: track('course.showPreviewClicked', showPreviewClicked),
      showConsoleClicked: track('course.showConsoleClicked', showConsoleClicked),
      fileClicked: track('course.fileClicked', fileClicked),
      addFileAborted: track('course.addFileAborted', addFileAborted),
      addFileSubmitted: track('course.addFileSubmitted', addFileSubmitted),
      playClicked: track('course.playClicked', playClicked),
      saveShortcutPressed: track('course.saveShortcutPressed', saveSceneClicked),
      saveSceneClicked: track('course.saveSceneClicked', saveSceneClicked),
      sceneNameClicked: track('course.sceneNameClicked', sceneNameClicked),
      listSceneNameClicked: track('course.listSceneNameClicked', listSceneNameClicked),
      removeFileClicked: track('course.removeFileClicked', removeFileClicked),
      sandboxTested: track('course.sandboxTested', sandboxTested),
      pauseClicked: track('course.pauseClicked', pauseClicked),
      mediaLoaded: track('course.mediaLoaded', mediaLoaded),
      videoStartedBuffering: track('course.videoStartedBuffering', videoStartedBuffering),
      videoFailed: track('course.videoFailed', videoFailed),
      seekChanged: track('course.seeked', seekChanged),
      sandboxClicked: track('course.sandboxClicked', sandboxClicked),
      videoBuffered: track('course.videoBuffered', videoBuffered),
      runAssignmentClicked: track('course.runAssignmentClicked', runAssignmentClicked),
      descriptionHovered: track('course.descriptionHovered', descriptionHovered),
      appClicked,
      codeChanged,
      assignmentCodeChanged,
      recordClicked,
      stopClicked,
      configureScenesClicked,
      addSceneSubmitted,
      uploadClicked,
      uploadFinished,
      uploadFailed,
      newSceneNameChanged,
      addFileNameUpdated,
      codeCursorChanged,
      buttonPopoverClicked,
      toggleForceUserClicked,
      tagNameMouseOver,
      tagNameMouseOut,
      continueCourseClicked,
      codeVerified,
      assignmentStatusClosed: track('course.assignmentStatusClosed', assignmentStatusClosed),
      assignmentStatusOpened: track('course.assignmentStatusClosed', assignmentStatusOpened),
      assignmentDescriptionChanged: {
        chain: assignmentDescriptionChanged,
        sync: true
      }
    });
  };
};
