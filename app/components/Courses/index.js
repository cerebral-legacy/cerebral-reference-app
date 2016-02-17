import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';

let ToolbarContent = null;
let Toolbar = null;
let styles = null;
let CoursesList = null;

@Cerebral({
  isLoading: 'courses.isLoading'
})
class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    require.ensure([], (require) => {
      Toolbar = require('common/components/Toolbar');
      ToolbarContent = require('../ToolbarContent');
      CoursesList = require('../CoursesList');
      styles = require('./styles.css');
      this.setState({
        canRender: true
      });
    });
  }
  renderCourses() {
    return (
      <div className={styles.wrapper} onClick={() => this.props.signals.courses.appClicked()}>
        <Toolbar>
          <ToolbarContent/>
        </Toolbar>
        <div className={styles.contentWrapper}>
          <CoursesList/>
        </div>
      </div>
    );
  }
  render() {
    if (this.state.canRender) {
      return (
        <div>
          <div className={this.props.isLoading ? styles.overlayVisible : styles.overlay}></div>
          {this.props.isLoading ? null : this.renderCourses()}
        </div>
      );
    }

    return null;
  }
}

export default Courses;
