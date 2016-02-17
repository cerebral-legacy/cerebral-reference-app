import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import icons from 'common/icons.css';

@Cerebral({
  recorder: 'recorder',
  currentAssignmentStatus: 'course.currentAssignmentStatus',
  showAssignmentStatus: 'course.showAssignmentStatus'
})
class AssignmentResult extends React.Component {
  renderSuccess() {
    return (
      <div className={styles.successWrapper}>
        <div className={styles.successText}>
          Bra jobba, du løste oppgaven!
        </div>
        <button
          className={styles.continue}
          onClick={() => this.props.signals.course.continueCourseClicked()}>
            <i className={icons.play}></i>
            <span className={styles.buttonText}>Fortsett</span>
        </button>
      </div>
    );
  }
  renderError() {
    return (
      <div className={this.props.showAssignmentStatus ? styles.openedErrorWrapper : styles.errorWrapper}>
        <div
          className={this.props.showAssignmentStatus ? styles.activeErrorButton : styles.errorButton}
          onClick={() => this.props.signals.course.assignmentStatusOpened()}>!</div>
        {
          this.props.showAssignmentStatus ?
            <div className={styles.errorPopup}>
              <h2>Oisann, prøv igjen...</h2>
              <p>{this.props.currentAssignmentStatus.result}</p>
              <div className={styles.closePopup} onClick={() => this.props.signals.course.assignmentStatusClosed()}>
                <i className={icons.close}/>
              </div>
            </div>
          :
            null
        }
      </div>
    );
  }
  render() {
    if (this.props.recorder.isPlaying) {
      return null;
    }

    if (this.props.currentAssignmentStatus.result === true) {
      return this.renderSuccess();
    } else if (this.props.currentAssignmentStatus.result) {
      return this.renderError();
    }

    return null;
  }
}

 export default AssignmentResult;
