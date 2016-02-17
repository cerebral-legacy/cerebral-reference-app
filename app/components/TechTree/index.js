import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import selectedTier from 'modules/course/computed/selectedTier';
import classNames from 'classnames';

let Toolbar = null;
let CoursesOverview = null;
let styles = null;
let icons = null;
let Tiers = null;
let ToolbarButton = null;
let ToolbarButtonPopover = null;
let AddNewCourse = null;
let TechTreeCoursePopup = null;
let elements = null;

@Cerebral({
  selectedTier: selectedTier,
  selectedCourse: 'techTree.selectedCourse',
  courseDependencyMap: 'techTree.courseDependencyMap',
  courses: 'techTree.courses',
  opened: 'techTree.opened',
  showNewCourse: 'courses.showNewCourse',
  user: 'user',
  openedCoursePopup: 'techTree.openedCoursePopup'
})
class TechTree extends React.Component {
  constructor() {
    super();
    this.hasMounted = false;
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    this.hasMounted = true;
    require.ensure([], (require) => {
      Toolbar = require('common/components/Toolbar');
      Tiers = require('../Tiers');
      CoursesOverview =  require('../CoursesOverview');
      styles = require('./styles.css');
      icons = require('common/icons.css');
      ToolbarButton = require('common/components/ToolbarButton');
      ToolbarButtonPopover = require('common/components/ToolbarButtonPopover');
      AddNewCourse = require('../AddNewCourse');
      TechTreeCoursePopup = require('../TechTreeCoursePopup');
      elements = require('common/elements.css');

      if (this.hasMounted) {
        this.setState({
          canRender: true
        });
      }
    });
  }
  componentWillUnmount() {
    this.hasMounted = false;
  }
  getCourse(courseId) {
    return this.props.courses.find((course) => {
      return course.id === courseId;
    });
  }
  getCourseDependencyObject(courseId) {
    return this.props.selectedTier.courseDependencyList.find((course) => {
      return course.courseId === courseId;
    });
  }
  renderLevels() {
    const renderedLevels = [];
    const levels = this.props.courseDependencyMap;

    levels.forEach((level, levelIndex) => {
      const levelBoxes = [];

      for (let x = 0; x < level.length; x++) {
        const course = level[x];
        const courseIndex = x;

        if (course && (course.topLine || course.bottomLine)) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{borderTop: course ? '1px solid #5a7497' : ''}}
              className={styles.box}>
            </div>
          );
        } else if (level.sideLine) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{borderTop: typeof course === 'number' || typeof course === 'string' ? '1px solid #5a7497' : ''}}
              className={styles.line}>
            </div>
          );
        } else if (level.centerLine) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{
                borderLeft: typeof course === 'number' || typeof course === 'string' ? '1px solid #5a7497' : 'transparent'
              }}
              className={styles.centerLine}>
            </div>
          );
        } else {
          if (course) {
            if (this.getCourse(course.courseId).type === 'course') {
              x = x + 7; // slots a course takes up
              levelBoxes.push(
                <div
                  key={courseIndex}
                  className={styles.largeBox}>
                  {this.renderCourse(this.getCourse(course.courseId), courseIndex)}
                </div>
              );
            } else {
              levelBoxes.push(
                <div
                  key={courseIndex}
                  className={styles.smallBox}>
                  {this.renderTask(this.getCourse(course.courseId), courseIndex)}
                </div>
              );
              x = x + 3; // slots a task takes up
            }
          } else {
            levelBoxes.push(
              <div
                key={courseIndex}
                style={{backgroundColor: 'transparent'}}
                className={styles.box}>
              </div>
            );
          }
        }
      }

      if (level.sideLine) {
        renderedLevels.push(
          <div key={levelIndex} className={styles.linesLevel}>{levelBoxes}</div>
        );
      } else if (level.centerLine) {
        renderedLevels.push(
          <div key={levelIndex} className={styles.centerLineLevel}>{levelBoxes}</div>
        );
      } else {
        renderedLevels.push(
          <div key={levelIndex} className={styles.boxLevel}>{levelBoxes}</div>
        );
      }
    });

    return renderedLevels;
  }
  canRemoveCourse(course) {
    if (!this.props.user.isAdmin) {
      return false;
    }

    const courseListObject = this.props.selectedTier.courseDependencyList.find((dependencyCourse) => {
      return dependencyCourse.courseId === course.id;
    });

    if (courseListObject && courseListObject.requiredBy.length > 0) {
      return false;
    }

    return true;
  }
  tierIsCompleted() {
    if (!this.props.selectedTier || !this.props.selectedTier.courseDependencyList.length) {
      return false;
    }
    const courses = this.props.selectedTier.courseDependencyList;
    const lastCourse = this.getCourse(courses[courses.length - 1].courseId);

    if (this.courseIsCompleted(lastCourse)) {
      return true;
    }

    return false;
  }
  courseIsCompleted(course) {
    if (!this.props.user.assignmentsSolved[course.id]) {
      return false;
    }

    const finishedAssignments = Object.keys(this.props.user.assignmentsSolved[course.id]).reduce((total, key) => {
      return total + this.props.user.assignmentsSolved[course.id][key];
    }, 0);

    return finishedAssignments === this.getTotalAssignments(course);
  }
  courseIsActive(course) {
    if (this.courseIsCompleted(course)) {
      return false;
    }
    const courseDependencyObject = this.getCourseDependencyObject(course.id);

    if (courseDependencyObject) {
      return courseDependencyObject.requires.every((courseId) => {
        return this.courseIsCompleted(this.getCourse(courseId));
      });
    }

    return false;
  }
  courseIsStarted(course) {
    if (!this.courseIsActive(course)) {
      return false;
    }

    return this.props.user.assignmentsSolved[course.id] && Object.keys(this.props.user.assignmentsSolved[course.id]).length;
  }
  getProgressPercent(course) {
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
  renderProgressBar(course) {
    return (
      <div className={styles.progressWrapper}>
        <div className={styles.progressBar}>
          <div className={styles.progressed} style={{width: this.getProgressPercent(course) + '%'}}></div>
        </div>
      </div>
    );
  }
  renderCourse(course, key) {
    const courseIsCompleted = this.courseIsCompleted(course);
    const courseIsActive = this.courseIsActive(course);
    const courseIsStarted = this.courseIsStarted(course);
    const courseIsDisabled = !courseIsStarted && !courseIsActive && !courseIsCompleted;

    return (
      <div
        key={key}
        className={classNames(styles.course, {
          [styles.courseCompleted]: courseIsCompleted && !courseIsActive,
          [styles.courseActive]: courseIsActive,
          [styles.courseStarted]: courseIsStarted,
          [styles.courseSelected]: this.props.selectedCourse && this.props.selectedCourse.id === course.id
        })}
        onClick={(e) => this.onCourseClicked(e, course)}>
        <div className={classNames(styles.courseBadge, {
          [styles.courseBadgeCompleted]: courseIsCompleted && !courseIsActive,
          [styles.courseBadgeActive]: courseIsActive || courseIsStarted
        })}>
          <span className={courseIsDisabled ? icons.lock : icons.school}></span>
        </div>
        <div className={courseIsStarted ? styles.titleProgressWrapper : styles.titleWrapper}>
          <div className={classNames(styles.title, {
            [styles.titleCompleted]: courseIsCompleted,
            [styles.titleActive]: courseIsActive || courseIsStarted
          })}>
            {course.name}
          </div>
          {
            courseIsStarted ?
              <span className={styles.subTitle}>{this.getProgressPercent(course)}%</span>
            :
              null
          }
        </div>
        {courseIsStarted ? this.renderProgressBar(course) : null}
        {
          this.canRemoveCourse(course) ?
            <div
            onClick={(e) => {
              e.stopPropagation();
              this.props.signals.techTree.unlinkCourseClicked({course: course});
            }}
              className={styles.removeCourse}>
              X
            </div>
          :
            null
        }
      </div>
    );
  }
  renderTask(task, key) {
    const taskIsCompleted = this.courseIsCompleted(task);
    const taskIsActive = this.courseIsActive(task);
    const taskIsStarted = this.courseIsStarted(task);
    const taskIsDisabled = !taskIsStarted && !taskIsActive && !taskIsCompleted;

    return (
      <div
        key={key}
        className={classNames(styles.task, {
          [styles.courseCompleted]: taskIsCompleted && !taskIsActive,
          [styles.courseActive]: taskIsActive,
          [styles.courseStarted]: taskIsStarted,
          [styles.courseSelected]: this.props.selectedCourse && this.props.selectedCourse.id === task.id
        })}
        onClick={(e) => this.onCourseClicked(e, task)}>
        <div className={classNames(styles.taskBadge, {
          [styles.courseBadgeCompleted]: taskIsCompleted && !taskIsActive,
          [styles.courseBadgeActive]: taskIsActive || taskIsStarted
        })}>
          <span className={taskIsDisabled ? icons.lock : icons.light}></span>
        </div>
        <div className={taskIsStarted ? styles.titleProgressWrapper : styles.titleWrapper}>
          <div className={classNames(styles.title, {
            [styles.titleCompleted]: taskIsCompleted && !taskIsActive,
            [styles.titleActive]: taskIsActive || taskIsStarted
          })}>
            {task.name}
          </div>
          {
            taskIsStarted ?
              <span className={styles.subTitle}>{this.getProgressPercent(task)}%</span>
            :
              null
          }
        </div>
        {taskIsStarted ? this.renderProgressBar(task) : null}
        {
          this.canRemoveCourse(task) ?
            <div
              onClick={(e) => {
                e.stopPropagation();
                this.props.signals.techTree.unlinkCourseClicked({course: task});
              }}
              className={styles.removeCourse}>
              X
            </div>
          :
            null
        }
      </div>
    );
  }
  onCourseClicked(e, course) {
    e.stopPropagation();
    const container = e.currentTarget;
    const offsetLeft = container.offsetLeft;
    const offsetTop = container.offsetTop + container.offsetHeight;

    this.props.signals.techTree.courseClicked({
      course: course,
      courseIsCompleted: this.courseIsCompleted(course),
      courseIsActive: this.courseIsActive(course),
      courseIsStarted: this.courseIsStarted(course),
      position: {
        left: offsetLeft,
        top: offsetTop
      }
    });
  }
  renderContinueMainAssignmentPopup() {
    return (
      <div
        className={this.props.showMainAssignmentPopup ? styles.startMainAssignmentPopup : styles.hidden}
        onClick={(e) => {e.stopPropagation();}}
        style={{marginTop: -40}}>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.signals.techTree.continueMainAssignmentClicked();
        }}>
          <button type="submit" className={`${elements.button} ${styles.startMainAssignmentButton}`}>
            Fortsett
          </button>
        </form>
        <div className={styles.mainAssignmentArrow}></div>
        <div className={styles.mainAssignmentArrowBorder}></div>
      </div>
    );
  }
  renderStartMainAssignmentPopup() {
    return (
      <div
        className={this.props.showMainAssignmentPopup ? styles.startMainAssignmentPopup : styles.hidden}
        onClick={(e) => {e.stopPropagation();}}
        style={{marginTop: -80}}>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.signals.techTree.startMainAssignmentClicked();
        }}>
          <input
            className={`${elements.input} ${styles.mainAssignmentNameInput}`}
            placeholder="Ditt navn"
            onChange={(e) => this.props.signals.techTree.nameInputChanged({value: e.target.value})}/>
          <button type="submit" className={`${elements.button} ${styles.startMainAssignmentButton}`}>
            Start
          </button>
        </form>
        <div className={styles.mainAssignmentArrow}></div>
        <div className={styles.mainAssignmentArrowBorder}></div>
      </div>
    );
  }
  render() {
    if (this.state.canRender) {
      return (
        <div className={this.props.opened ? styles.wrapper : styles.wrapperClosed} onClick={() => this.props.signals.techTree.wrapperClicked()}>
          <Toolbar>
            <ToolbarButton icon={icons.chevronRight} title="Fortsett kurs" onClick={() => this.props.signals.techTree.toggled()}/>
            {
              this.props.user.isAdmin ?
                <ToolbarButtonPopover
                  side="right"
                  className={styles.addNewCourseButton}
                  icon={icons.addFile}
                  onClick={() => this.props.signals.courses.newCourseClicked()}
                  show={this.props.showNewCourse}>
                  <AddNewCourse/>
                </ToolbarButtonPopover>
              :
                null
            }
          </Toolbar>
          <Tiers/>
          <div className={styles.techTreeWrapper}>
            {this.renderLevels()}
            {this.props.openedCoursePopup ? <TechTreeCoursePopup/> : null}
          </div>
          {this.props.user.isAdmin ? <CoursesOverview/> : null}
        </div>
      );
    }

    return null;
  }
}

export default TechTree;
