import React from 'react';
import styles from './styles.css';
import icons from 'common/icons.css';

function PlayButton(props) {
  let className = styles.wrapper;

  if (props.recorder.isRecording) {
    className = styles.recording;
  }

  if (props.recorder.isPlaying) {
    className = styles.playing;
  }

  const isRecordingOrPlaying = props.recorder.isRecording || props.recorder.isPlaying;

  function onClick(event) {
    // Have to stop as last signal should be pause
    event.stopPropagation();
    
    if (isRecordingOrPlaying) {
      props.onPauseClick();
    } else {
      props.onPlayClick();
    }
  }

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={props.disabled}>
      <div className={styles.iconWrapper}>
        <div className={isRecordingOrPlaying ? icons.pause : icons.play}></div>
      </div>
    </button>
  );
}

export default PlayButton;
