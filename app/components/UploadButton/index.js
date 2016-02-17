import React from 'react';
import styles from './styles.css';
import ToolbarButton from 'common/components/ToolbarButton';
import icons from 'common/icons.css';

function UploadButton(props) {
  const className = styles.wrapper;

  return (
    <div className={className}>
      <ToolbarButton
        disabled={props.disabled}
        icon={props.recorder.isUploading ? icons.loading : icons.uploadFile}
        onClick={() => props.onClick()}/>
    </div>
  );
}

export default UploadButton;
