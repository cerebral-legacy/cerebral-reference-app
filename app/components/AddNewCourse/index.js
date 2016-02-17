import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import icons from 'common/icons.css';
import styles from './styles.css';
import elements from 'common/elements.css';

@Cerebral({
  isSavingNewCourse: 'courses.isSavingNewCourse',
  newCourse: 'courses.newCourse'
})
class AddNewCourse extends React.Component {
  onNewCourseSubmit(e) {
    e.preventDefault();
    this.props.signals.courses.newCourseSubmitted();
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <form onSubmit={(e) => this.onNewCourseSubmit(e)}>
          <input
            className={elements.input}
            onChange={(e) => this.props.signals.courses.newCourseUpdated.sync({field: 'name', value: e.target.value})}
            placeholder="Navn på kurs"
            disabled={this.props.isSavingNewCourse}
            autoFocus
            required/>
          <input
            className={`${elements.input} ${styles.sceneInput}`}
            onChange={(e) => this.props.signals.courses.newCourseUpdated.sync({field: 'sceneName', value: e.target.value})}
            placeholder="Navn på første scene"
            disabled={this.props.isSavingNewCourse}
            required/>
          <textarea
            className={`${elements.textarea} ${styles.sceneInput}`}
            onChange={(e) => this.props.signals.courses.newCourseUpdated.sync({field: 'description', value: e.target.value})}
            placeholder="Beskrivelse"
            disabled={this.props.isSavingNewCourse}
            required>
          </textarea>
          <input
            className={`${elements.input} ${styles.sceneInput}`}
            onChange={(e) => this.props.signals.courses.newCourseUpdated.sync({field: 'skillLevel', value: e.target.value})}
            placeholder="Ferdighetsnivå"
            disabled={this.props.isSavingNewCourse}
            required/>
          <input
            type="radio"
            className={styles.radioButton}
            checked={this.props.newCourse.type === 'course'}
            onChange={() => this.props.signals.courses.newCourseUpdated.sync({field: 'type', value: 'course'})}
            disabled={this.props.isSavingNewCourse}/>
          <div className={styles.radioLabel}>Kurs</div>
          <input
            type="radio"
            className={styles.radioButton}
            checked={this.props.newCourse.type === 'task'}
            onChange={() => this.props.signals.courses.newCourseUpdated.sync({field: 'type', value: 'task'})}
            disabled={this.props.isSavingNewCourse}/>
          <div className={styles.radioLabel}>Ferdighet</div>
          <button
            type="submit"
            className={elements.button}
            disabled={this.props.isSavingNewCourse}>
            {
              this.props.isSavingNewCourse ?
                <span className={styles.savingIcon + ' ' + icons.loading}></span>
              :
                'Opprett kurs'
            }
          </button>
        </form>
      </div>
    );
  }
}

export default AddNewCourse;
