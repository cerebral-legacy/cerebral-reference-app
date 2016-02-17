import saveSandboxChain from '../chains/saveSandbox';
import isPlayingRecordingOrNotAuthor from '../actions/isPlayingRecordingOrNotAuthor.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import saveScene from '../actions/saveScene.js';
import hasRecordedScene from '../actions/hasRecordedScene.js';
import saveAssignments from '../actions/saveAssignments';

export default [
  isPlayingRecordingOrNotAuthor, {
    true: [
      ...saveSandboxChain
    ],
    false: [
      hasRecordedScene, {
        true: [
          saveAssignments, {
            success: [
              showSnackbar('Oppgavene er lagret')
            ],
            error: [
              showSnackbar('Det skjedde en feil med lagring av oppgavene!')
            ]
          }
        ],
        false: [
          ...saveSandboxChain,
          saveScene, {
            success: [
              showSnackbar('Scenen er lagret')
            ],
            error: [
              showSnackbar('Det skjedde en feil med lagring av scenen!')
            ]
          }
        ]
      }
    ]
  }
];
