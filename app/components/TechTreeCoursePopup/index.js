import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import icons from 'common/icons.css';

const containerMarginLeft = -337; // from CSS
const containerWidth = 685 + containerMarginLeft; // from CSS
const rightMargin = 30;
const leftMargin = 10;
const arrowMarginLeft = 327;
const bottomMargin = 15;

@Cerebral({
  openedCoursePopup: 'techTree.openedCoursePopup',
  user: 'user'
})
class TechTreeCoursePopup extends React.Component {
  constructor() {
    super();
    this.state = {
      containerHeight: 210 // default value
    };
  }
  componentDidMount() {
    this.setState({
      containerHeight: this.refs.wrapper.offsetHeight
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.openedCoursePopup.course.id !== this.props.openedCoursePopup.course.id) {
      this.setState({
        containerHeight: this.refs.wrapper.offsetHeight
      });
    }
  }
  getLeftPosition(originalPosition) {
    if (originalPosition + containerMarginLeft - leftMargin <= leftMargin) {
      return leftMargin - containerMarginLeft;
    }

    if (originalPosition + containerWidth + rightMargin >= document.body.offsetWidth) {
      return originalPosition - (originalPosition + containerWidth + rightMargin - document.body.offsetWidth);
    }

    return originalPosition;
  }
  getLeftArrowPosition(originalWrapperPosition) {
    if (originalWrapperPosition - this.getLeftPosition(originalWrapperPosition) < 0) {
      return arrowMarginLeft + originalWrapperPosition - this.getLeftPosition(originalWrapperPosition);
    }

    if (originalWrapperPosition - this.getLeftPosition(originalWrapperPosition) > 0) {
      return arrowMarginLeft + originalWrapperPosition - this.getLeftPosition(originalWrapperPosition);
    }

    return arrowMarginLeft;
  }
  getProgressPercent() {
    const course = this.props.openedCoursePopup.course;

    if (!this.props.user.assignmentsSolved[course.id]) {
      return 0;
    }

    const solvedAssignmentsCount = Object.keys(this.props.user.assignmentsSolved[course.id]).reduce((total, key) => {
      return total + this.props.user.assignmentsSolved[course.id][key];
    }, 0);

    return Math.round((solvedAssignmentsCount / this.getTotalAssignments(course)) * 100);
  }
  getTotalAssignments(course) {
    return course.scenes.map((scene) => {
      return scene.assignments.length;
    }).reduce((total, assignments) => {
      return total + assignments;
    });
  }
  openCourse() {
    this.props.signals.course.opened({
      courseId: this.props.openedCoursePopup.course.id.toString(),
      sceneIndex: '0'
    });
  }
  renderButton() {
    if (this.props.openedCoursePopup.courseIsStarted) {
      return (
        <button className={styles.button} onClick={() => this.openCourse()}>
          <span className={`${icons.play} ${styles.buttonIcon}`}></span>
          Fortsett
        </button>
      );
    }

    if (this.props.openedCoursePopup.courseIsActive) {
      return (
        <button className={styles.button} onClick={() => this.openCourse()}>
          <span className={`${icons.play} ${styles.buttonIcon}`}></span>
          Start
        </button>
      );
    }

    if (this.props.openedCoursePopup.courseIsCompleted) {
      return (
        <button className={styles.buttonCompleted} onClick={() => this.openCourse()}>
          <span className={`${icons.play} ${styles.buttonIcon}`}></span>
          Start på nytt
        </button>
      );
    }

    return null;
  }
  renderIcon() {
    const course = this.props.openedCoursePopup;

    if (!course.courseIsCompleted && !course.courseIsActive && !course.courseIsStarted) {
      return (
        <div className={styles.iconDisabled}>
          <span className={icons.lock}></span>
        </div>
      );
    }

    if (course.course.type === 'course') {
      return (
        <div className={styles.icon}>
          <span className={icons.school}></span>
        </div>
      );
    }

    return (
      <div className={styles.icon}>
        <span className={icons.light}></span>
      </div>
    );
  }
  renderTopArrow() {
    const leftArrowPosition = this.getLeftArrowPosition(this.props.openedCoursePopup.position.left);

    return (
      <div>
        <div
          style={{left: leftArrowPosition}}
          className={styles.arrow}>
        </div>
        <div
          style={{left: leftArrowPosition - 2}}
          className={styles.arrowBorder}>
        </div>
      </div>
    );
  }
  renderBottomArrow() {
    const leftArrowPosition = this.getLeftArrowPosition(this.props.openedCoursePopup.position.left);

    return (
      <div>
        <div
          style={{left: leftArrowPosition}}
          className={styles.arrowBottom}>
        </div>
        <div
          style={{left: leftArrowPosition - 2}}
          className={styles.arrowBottomBorder}>
        </div>
      </div>
    );
  }
  getDuration(course) {
    const milliseconds = course.scenes.map((scene) => {
      if (scene.recording) {
        return scene.recording.duration * 2;
      }

      return 0;
    }).reduce((total, sceneDuration) => {
      return total + sceneDuration;
    });

    const minutes = Math.ceil(milliseconds / 60000);

    return minutes + ' min';
  }
  render() {
    const topPosition = this.props.openedCoursePopup.position.top;
    const techTreeCourseHeight = this.props.openedCoursePopup.course.type === 'course' ? 75 : 60;
    const displayBoxBelowCourse = topPosition + this.state.containerHeight + bottomMargin >= window.innerHeight ? false : true;

    return (
      <div
        ref="wrapper"
        style={{
          left: this.getLeftPosition(this.props.openedCoursePopup.position.left),
          top: displayBoxBelowCourse ? topPosition : topPosition - this.state.containerHeight - techTreeCourseHeight
        }}
        className={styles.wrapper}>
        {displayBoxBelowCourse ? this.renderTopArrow() : this.renderBottomArrow()}

        {this.renderIcon()}
        <div className={styles.textWrapper}>
          <div className={styles.title}>{this.props.openedCoursePopup.course.name}</div>
          <div className={styles.description}>{this.props.openedCoursePopup.course.description}</div>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressed} style={{width: this.getProgressPercent() + '%'}}></div>
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.detail}>
            <div className={styles.value}>{this.getProgressPercent()}%</div>
            <div className={styles.label}>Fullført</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.value}>{this.getDuration(this.props.openedCoursePopup.course)}</div>
            <div className={styles.label}>Estimert kurstid</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.value}>{this.props.openedCoursePopup.course.skillLevel}</div>
            <div className={styles.label}>Ferdighetsnivå</div>
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default TechTreeCoursePopup;
