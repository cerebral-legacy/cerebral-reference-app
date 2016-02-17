import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import icons from 'common/icons.css';

@Cerebral({
  currentAssignmentStatus: 'course.currentAssignmentStatus',
  currentAssignmentIndex: 'course.currentAssignmentIndex'
})
class AssignmentSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      runSuccessAnimation: false
    };
  }
  componentWillUpdate(nextProps) {
    if (nextProps.currentAssignmentStatus.result === true && this.props.currentAssignmentStatus.result !== true) {
      this.setState({
        show: true
      });
      setTimeout(() => {
        this.setState({
          runSuccessAnimation: true
        });
        setTimeout(() => {
          this.setState({
            runSuccessAnimation: false,
            show: false
          });
        }, 1000);
      }, 1500);
    }
  }
  render() {
    let style = null;

    if (!this.state.show) {
      return null;
    }

    if (this.state.runSuccessAnimation) {
      const circleBoundingRect = this.refs.circle.getBoundingClientRect();
      const boundingRect = document.querySelector(`#assignment_${this.props.currentAssignmentIndex}`).getBoundingClientRect();
      style = {
        transform: `translate3d(${boundingRect.left - circleBoundingRect.left - 116}px,${boundingRect.top - circleBoundingRect.top - 116}px,0) scale(0.09)`,
        opacity: 0
      };
    }

    return (
      <div ref="circle" className={styles.circle} style={style}>
        <i className={icons.check}/>
      </div>
    );
  }
}

export default AssignmentSuccess;
