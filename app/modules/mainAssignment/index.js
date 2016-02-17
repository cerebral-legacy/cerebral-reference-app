import authenticate from 'common/factories/chains/authenticate';
import track from 'common/factories/chains/track';
import createSession from 'common/factories/chains/createSession';

import opened from './signals/opened';
import appClicked from 'modules/course/signals/appClicked';
import addFileClicked from 'modules/course/signals/addFileClicked';
import codeChanged from 'modules/course/signals/codeChanged';
import fileClicked from 'modules/course/signals/fileClicked';
import addFileAborted from 'modules/course/signals/addFileAborted';
import addFileSubmitted from 'modules/course/signals/addFileSubmitted';
import saveSceneClicked from 'modules/course/signals/saveSceneClicked';
import removeFileClicked from 'modules/course/signals/removeFileClicked';
import addFileNameUpdated from 'modules/course/signals/addFileNameUpdated';
import pauseClicked from 'modules/course/signals/pauseClicked';
import codeCursorChanged from 'modules/course/signals/codeCursorChanged';
import seekChanged from 'modules/course/signals/seekChanged';
import buttonPopoverClicked from 'modules/course/signals/buttonPopoverClicked';
import sandboxClicked from 'modules/course/signals/sandboxClicked';
import toggleForceUserClicked from 'modules/course/signals/toggleForceUserClicked';
import runAssignmentClicked from 'modules/course/signals/runAssignmentClicked';
import tagNameMouseOver from 'modules/course/signals/tagNameMouseOver';
import tagNameMouseOut from 'modules/course/signals/tagNameMouseOut';
import descriptionHovered from 'modules/course/signals/descriptionHovered';
import continueCourseClicked from 'modules/course/signals/continueCourseClicked';
import googleSearchSubmitted from './signals/googleSearchSubmitted';
import googleInputChanged from './signals/googleInputChanged';
import saveMainAssignmentClicked from './signals/saveMainAssignmentClicked';

export default () => {
  return (module) => {
    module.addState({
      isLoading: true,
      descriptions: [],
      currentFileIndex: 0,
      files: [],
      existingAssignment: false,
      preview: false
    });

    module.addSignals({
      opened: createSession('mainAssignment.opened', authenticate(opened)),
      previewOpened: createSession('mainAssignment.previewOpened', authenticate(opened)),
      addFileClicked: track('mainAssignment.addFileClicked', addFileClicked),
      fileClicked: track('mainAssignment.fileClicked', fileClicked),
      addFileAborted: track('mainAssignment.addFileAborted', addFileAborted),
      addFileSubmitted: track('mainAssignment.addFileSubmitted', addFileSubmitted),
      saveShortcutPressed: track('mainAssignment.saveShortcutPressed', saveSceneClicked),
      saveSceneClicked: track('mainAssignment.saveSceneClicked', saveSceneClicked),
      removeFileClicked: track('mainAssignment.removeFileClicked', removeFileClicked),
      pauseClicked: track('mainAssignment.pauseClicked', pauseClicked),
      seekChanged: track('mainAssignment.seeked', seekChanged),
      sandboxClicked: track('mainAssignment.sandboxClicked', sandboxClicked),
      runAssignmentClicked: track('mainAssignment.runAssignmentClicked', runAssignmentClicked),
      descriptionHovered: track('mainAssignment.descriptionHovered', descriptionHovered),
      appClicked,
      codeChanged,
      addFileNameUpdated,
      codeCursorChanged,
      buttonPopoverClicked,
      toggleForceUserClicked,
      tagNameMouseOver,
      tagNameMouseOut,
      continueCourseClicked,
      googleSearchSubmitted,
      googleInputChanged: {
        chain: googleInputChanged,
        sync: true
      },
      saveMainAssignmentClicked
    });
  };
};
