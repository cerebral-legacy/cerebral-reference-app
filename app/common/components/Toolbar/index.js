import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

@Cerebral({
  recorder: ['recorder']
})
class Toolbar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={styles.wrapper}>
        { this.props.recorder.isPlaying ? <div className={styles.toolbarOverlay}></div> : null }
        {this.props.children}
      </div>
    );
  }
}

export default Toolbar;
