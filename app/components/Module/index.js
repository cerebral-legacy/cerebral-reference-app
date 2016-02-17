import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

function Module(props) {
  const className = classNames({
    [styles.wrapper]: props.show,
    [props.className]: true,
    [styles.hidden]: !props.show
  });

  return (
    <div className={className}>
      {
        props.show ?
          props.children
        :
          null
      }
    </div>
  );
}

export default Module;
