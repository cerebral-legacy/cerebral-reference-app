import set from 'cerebral-addons/set';
import copy from 'cerebral-addons/copy';
import getDescriptions from '../actions/getDescriptions';
import hasLoadedDescriptions from '../actions/hasLoadedDescriptions';
import showSnackbar from 'common/factories/actions/showSnackbar';

export default [
  hasLoadedDescriptions, {
    true: [],
    false: [
      set('state:/descriptions.isLoading', true),
      getDescriptions, {
        success: [
          copy('input:/descriptions', 'state:/descriptions.list')
        ],
        error: [
          showSnackbar('Innlasting av beskrivelser feilet!')
        ]
      },
      set('state:/descriptions.isLoading', false)
    ]
  }
];
