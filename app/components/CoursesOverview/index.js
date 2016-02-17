import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import selectedTier from 'modules/course/computed/selectedTier';

@Cerebral({
  selectedTier: selectedTier,
  courses: 'techTree.courses',
  courseDependencyList: 'techTree.courseDependencyList'
})
class CoursesOverview extends React.Component {
  onCourseDependencyClicked(e, course) {
    e.stopPropagation();
    this.props.signals.techTree.courseDependencyClicked({course: course});
  }
  renderCourses(courses) {
    if (!courses) {
      return <div>Ingen kurs er opprettet</div>;
    }

    return courses.filter((course) => {
      if (course.isInTier) {
        return false;
      }

      if (!this.props.selectedTier.courseDependencyList.length) {
        return true;
      }

      return !this.props.selectedTier.courseDependencyList.find((dependencyCourse) => {
        return course.id === dependencyCourse.courseId;
      });
    }).map((course, index) => {
      return (
        <div
          key={index}
          className={styles.course}
          onClick={(e) => this.onCourseDependencyClicked(e, course)}>
          {course.name}
        </div>
      );
    });
  }
  render() {
    if (!this.props.selectedTier) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        {this.props.selectedCourse ? 'Legg til kurs som er avhengig av: ' + this.props.selectedCourse.title : 'Velg kurs:'}
        <br/><br/>
        {this.renderCourses(this.props.courses)}
      </div>
    );
  }
}

export default CoursesOverview;
