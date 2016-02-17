import React from 'react';
import icons from 'common/icons.css';
import styles from './styles.css';

function RemoveFile(props) {
  return (
    <span
      className={`${props.show ? styles.icon : styles.hidden} ${icons.delete}`}
      onClick={props.onClick}>
    </span>
  );
}

export default RemoveFile;
