import React from 'react';
import AssignmentsBar from '../AssignmentsBar';
import styles from './styles.css';

function Assignments(props) {
  return (
    <div className={styles.wrapper}>
      <AssignmentsBar assignments={props.assignments} currentIndex={props.currentAssignmentIndex}/>
    </div>
  );
}

export default Assignments;
