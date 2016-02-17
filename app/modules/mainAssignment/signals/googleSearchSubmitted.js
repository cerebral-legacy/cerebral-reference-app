import openGoogleTab from '../actions/openGoogleTab';
import set from 'cerebral-addons/set';

export default [
  openGoogleTab,
  set('state:/mainAssignment.googleInput', '')
];
