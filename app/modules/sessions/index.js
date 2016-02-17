import authenticate from 'common/factories/chains/authenticate';

import opened from './signals/opened';
import sessionSelected from './signals/sessionSelected';
import sessionSignalClicked from './signals/sessionSignalClicked';

export default () => {
  return (module) => {
    module.addState({
      selectedSession: null,
      sessionsList: [],
      openedSignal: null
    });

    module.addSignals({
      opened: authenticate(opened),
      sessionSelected,
      sessionSignalClicked
    });
  };
};
