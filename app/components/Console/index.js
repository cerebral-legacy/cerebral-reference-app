import React from 'react';
import styles from './styles.css';

function Console(props) {
  return (
    <div className={props.show ? styles.wrapper : styles.wrapperHidden}></div>
  );
}

export default Console;
