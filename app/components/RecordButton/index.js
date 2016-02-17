import React from 'react';
import styles from './styles.css';
import ToolbarButton from 'common/components/ToolbarButton';
import icons from 'common/icons.css';

function RecordButton(props) {
  let className = styles.wrapper;

  if (props.recorder.isRecording) {
    className = styles.recording;
  }

  return (
    <div className={className}>
      <ToolbarButton
        disabled={props.disabled}
        icon={props.recorder.isRecording ? icons.stop : icons.mic}
        onClick={() => props.recorder.isRecording ? props.onStopClick() : props.onRecordClick()}/>
    </div>
  );
}

export default RecordButton;
