import saveNewTier from '../actions/saveNewTier';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import addNewTier from '../actions/addNewTier';
import set from 'cerebral-addons/set';

export default [
  saveNewTier, {
    success: [
      addNewTier,
      set('state:/techTree.newTierName', ''),
      showSnackbar('Ny tier ble opprettet')
    ],
    error: [
      showSnackbar('Opprettelse av ny tier feilet!')
    ]
  }
];
