import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';

let Scene = null;
let styles = null;
let MouseCursor = null;
let TechTree = null;

@Cerebral({
  isLoading: 'course.isLoading',
  user: 'user'
})
class Course extends React.Component {
  constructor() {
    super();
    this.onKeydown = this.onKeydown.bind(this);
    this.hasMounted = false;
    this.mouseDown = {
      mousePositionX: 0,
      mousePositionY: 0,
      time: null
    };
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    this.hasMounted = true;
    window.addEventListener('keydown', this.onKeydown);
    require.ensure([], (require) => {
      Scene = require('../Scene');
      MouseCursor = require('../MouseCursor');
      styles = require('./styles.css');
      TechTree = require('../TechTree');

      if (this.hasMounted) {
        this.setState({
          canRender: true
        });
      }
    });
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
    this.hasMounted = false;
  }
  onKeydown(event) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) {
      event.preventDefault();

      if (this.props.user.forceUser || !this.props.user.isAdmin) {
        this.props.signals.course.runAssignmentClicked();
      } else {
        this.props.signals.course.saveShortcutPressed();
      }
    }
  }
  assignmentDescriptionChanged(e) {
    this.props.signals.course.assignmentDescriptionChanged.sync({
      description: e.target.value
    });
  }
  onMouseDown() {
    this.mouseDown.time = Date.now();
  }
  onMouseUp(e) {
    const time = Date.now();

    if (time - this.mouseDown.time < 100) {
      this.props.signals.course.appClicked({
        mousePositionX: e.clientX,
        mousePositionY: e.clientY
      });
    }
  }
  renderScene() {
    return (
      <div
        className={styles.wrapper}
        onMouseDown={() => this.onMouseDown()}
        onMouseUp={(e) => this.onMouseUp(e)}>
        <Scene/>
        <MouseCursor/>
      </div>
    );
  }
  render() {
    if (this.state.canRender) {
      return (
        <div>
          <TechTree/>
          <div className={this.props.isLoading ? styles.overlayVisible : styles.overlay}></div>
          {this.props.isLoading ? null : this.renderScene()}
        </div>
      );
    }

    return null;
  }
}

export default Course;
