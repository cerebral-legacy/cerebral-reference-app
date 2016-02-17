import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import icons from 'common/icons.css';
import classnames from 'classnames';
import currentScene from 'modules/course/computed/currentScene';
import currentAssignmentsSolvedCount from 'modules/course/computed/currentAssignmentsSolvedCount';
import isAdminMode from 'modules/course/computed/isAdminMode';

@Cerebral({
  recorder: 'recorder',
  assignmentsPositions: 'course.assignmentsPositions',
  assignmentsSolvedCount: currentAssignmentsSolvedCount,
  currentAssignmentIndex: 'course.currentAssignmentIndex',
  currentScene: currentScene,
  isAdminMode: isAdminMode
})
class DurationSlider extends React.Component {
  static contextTypes = {
    controller: React.PropTypes.object
  }
  constructor() {
    super();
    this.state = {
      currentSeek: 0,
      interval: null,
      isExecutingSignal: false
    };
    this.updateExecutingSignal = this.updateExecutingSignal.bind(this);
  }
  componentWillMount() {
    this.context.controller.on('signalEnd', this.updateExecutingSignal);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.recorder.currentSeek !== this.props.recorder.currentSeek) {
      this.setState({
        currentSeek: nextProps.recorder.currentSeek[0]
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.recorder.isPlaying && this.props.recorder.isPlaying) {
      this.startInterval(this.props.recorder.currentSeek[0]);
    } else if (prevProps.recorder.isPlaying && !this.props.recorder.isPlaying) {
      this.stopInterval();
    }
  }
  componentWillUnmount() {
    this.context.controller.removeListener('signalEnd', this.updateExecutingSignal);
  }
  updateExecutingSignal() {
    if (this.state.isExecutingSignal !== this.context.controller.isExecuting()) {
      this.setState({
        isExecutingSignal: this.context.controller.isExecuting()
      });
    }
  }
  startInterval(time) {
    this.setState({
      currentSeek: time,
      interval: setInterval(() => {
        if (this.props.recorder.isPlaying) {
          this.setState({currentSeek: this.state.currentSeek + 1000});
        }
      }, 1000)
    });
  }
  stopInterval() {
    clearInterval(this.state.interval);
    this.setState({
      interval: null
    });
  }
  handlerPosition() {
    let handlerPosition = 0;
    const duration = ((this.props.currentScene.duration || 0) / 1000).toFixed() - 1;
    const currentSeek = (this.state.currentSeek / 1000).toFixed();
    handlerPosition = currentSeek / duration * 100;
    handlerPosition = handlerPosition > 100 ? 100 : handlerPosition;

    return handlerPosition;
  }
  getSeekByEvent(event) {
    return this.props.currentScene.duration / event.currentTarget.offsetWidth * (event.clientX - event.currentTarget.offsetLeft);
  }
  seek(seek) {
    if (this.props.currentScene.recording && !this.state.isExecutingSignal) {
      const assignmentsPassed = this.props.assignmentsPositions.filter((point) => {
        return point < seek;
      });

      if (!this.props.isAdminMode && this.props.assignmentsSolvedCount < assignmentsPassed.length) {
        return;
      }

      this.props.signals.course.seekChanged({
        seek: seek
      }, {
        isRecorded: true
      });
      clearInterval(this.state.interval);

      if (this.props.recorder.isPlaying) {
        this.startInterval(seek);
      } else {
        this.setState({
          currentSeek: seek
        });
      }
    }
  }
  renderTime(time) {
    let min = Math.floor(time / 60000);
    min = min || 0;
    let sec = ((time % 60000) / 1000);
    sec = sec || 0;
    sec = sec.toFixed(0);
    sec = sec < 10 ? '0' + sec : sec;

    return min + ':' + sec;
  }
  onAssignmentClick(position) {
    this.seek(position + 100);
  }
  renderAssignmentPosition(position, index) {
    const isSolved = !this.props.isAdminMode && this.props.assignmentsSolvedCount > index;
    const className = classnames({
      [styles.assignment]: true,
      [styles.activeAssignment]: this.props.isAdminMode || this.props.assignmentsSolvedCount >= index,
      [styles.currentAssignment]: index === this.props.currentAssignmentIndex,
      [styles.solvedAssignment]: isSolved
    });

    return (
      <div
        id={'assignment_' + index}
        className={className}
        style={{left: `${(100 / this.props.currentScene.duration) * position}%`}}
        onClick={(event) => {
          event.stopPropagation();
          this.onAssignmentClick(position);
        }}
        key={index}>
          {isSolved ? <i className={icons.check}/> : '?'}
          {
            this.props.isAdminMode ?
              null
            :
              <div className={index === this.props.currentAssignmentIndex ? styles.activeArrow : styles.arrow}></div>
          }
      </div>
    );
  }
  render() {
    const lineWidth = (100 - this.handlerPosition()); // Reversing percent

    return (
      <div className={styles.wrapper}>
        <div className={styles.currentDuration}>{this.renderTime(this.state.currentSeek)}</div>
        <div className={styles.lineWrapper} onClick={(event) => this.seek(this.getSeekByEvent(event))}>
          <div className={styles.line}>
            <div className={styles.progressedLine} style={{right: lineWidth + '%'}}></div>

            {this.props.assignmentsPositions.map((position, index) => this.renderAssignmentPosition(position, index))}
          </div>
        </div>
        <div className={styles.durationEnd}>{this.renderTime(this.props.currentScene.duration)}</div>
      </div>
    );
  }
}

export default DurationSlider;
