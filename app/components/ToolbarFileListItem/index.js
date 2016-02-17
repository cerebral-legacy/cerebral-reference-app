import React from 'react';
import styles from './styles.css';

function ToolbarFileListItem(props) {
  return (
    <div onClick={props.onClick} className={props.active ? styles.activeWrapper : styles.wrapper}>
      <span className={props.icon}></span>
      <span className={styles.fileName}>{props.name}</span>
    </div>
  );
}

export default ToolbarFileListItem;
