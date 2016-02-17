import React from 'react';
import styles from './styles.css';

function ToolbarTitle(props) {
  return (
    <span className={styles.title}>
      {props.title}
    </span>
  );
}

export default ToolbarTitle;
