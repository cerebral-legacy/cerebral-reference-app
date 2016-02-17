import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import icons from 'common/icons.css';
import elements from 'common/elements.css';

@Cerebral({
  tiers: 'techTree.tiers',
  selectedTierIndex: 'techTree.selectedTierIndex',
  showAddNewTierInput: 'techTree.showAddNewTierInput',
  newTierName: 'techTree.newTierName',
  courses: 'techTree.courses',
  user: 'user',
  showMainAssignmentPopup: 'techTree.showMainAssignmentPopup',
  isExistingAssignment: 'mainAssignment.existingAssignment'
})
class Tiers extends React.Component {
  constructor() {
    super();
  }
  getCourse(courseId) {
    return this.props.courses.find((course) => {
      return course.id === courseId;
    });
  }
  tierIsSolved(tier) {
    if (!tier.courseDependencyList.length) {
      return false;
    }

    return tier.courseDependencyList.every((dependencyCourse) => {
      if (!this.props.user.assignmentsSolved[dependencyCourse.courseId] || !this.getCourse(dependencyCourse.courseId)) {
        return false;
      }

      const solvedAssignmentsCount = Object.keys(this.props.user.assignmentsSolved[dependencyCourse.courseId]).reduce((total, key) => {
        return total + this.props.user.assignmentsSolved[dependencyCourse.courseId][key];
      }, 0);

      return solvedAssignmentsCount === this.getTotalAssignments(this.getCourse(dependencyCourse.courseId));
    });
  }
  getTotalAssignments(course) {
    return course.scenes.map((scene) => {
      return scene.assignments.length;
    }).reduce((total, assignments) => {
      return total + assignments;
    });
  }
  tierIsActive(tier, index) {
    if (index === 0) {
      return true;
    }

    if (this.tierIsSolved(this.props.tiers[index - 1])) {
      return true;
    }
  }
  renderTiers() {
    return this.props.tiers.map((tier, index) => {
      return (
        <div
          key={tier.id}
          onClick={() => this.props.signals.techTree.tierClicked({tierIndex: index})}
          className={`
            ${this.props.selectedTierIndex === index ? styles.tierSelected : styles.tier}
            ${this.tierIsActive(tier, index) ? styles.tier : styles.tierDisabled}
            ${this.tierIsSolved(tier) ? styles.tierFinished : styles.tier}
        `}>
          <span className={`${icons.thumbDown} ${tier.disabled ? styles.icon : styles.hide}`}></span>
          {tier.name}
        </div>
      );
    });
  }
  onAddTierInputKeyDown = (e) => {
    const keyCode = e.keyCode;

    if (keyCode === 27) { // Escape
      this.props.signals.techTree.addTierAborted();
    }
  }
  onNewTierSubmit(e) {
    e.preventDefault();
    this.props.signals.techTree.newTierSubmitted();
  }
  renderAddNewTier() {
    if (!this.props.user.isAdmin) {
      return null;
    }

    if (this.props.showAddNewTierInput) {
      return (
        <form
          onSubmit={(e) => this.onNewTierSubmit(e)}
          className={`${styles.tier} ${styles.tierAddNew}`}>
          <input
            value={this.props.newTierName}
            className={`${styles.inputAddNewTier} ${elements.input}`}
            onBlur={this.props.signals.techTree.addTierAborted}
            onChange={(e) => this.props.signals.techTree.newTierNameUpdated({name: e.target.value})}
            onKeyDown={(e) => this.onAddTierInputKeyDown(e)}
            placeholder = "Navn..."
            autoFocus />
        </form>
      );
    }

    return (
      <div
        onClick={() => this.props.signals.techTree.addTierClicked()}
        className={`${styles.tier} ${styles.tierAddNew}`}>
        <span className={`${icons.addAssignment} ${styles.icon}`}></span>
        Legg til tier
      </div>
    );
  }
  renderContinueMainAssignmentPopup() {
    return (
      <div
        className={styles.startMainAssignmentPopup}
        onClick={(e) => {e.stopPropagation();}}>
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
        className={styles.startMainAssignmentPopup}
        onClick={(e) => {e.stopPropagation();}}>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.signals.techTree.startMainAssignmentClicked();
        }}>
          <input
            className={`${elements.input} ${styles.mainAssignmentNameInput}`}
            placeholder="Ditt navn"
            autoFocus
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
  renderMainAssignmentPopup() {
    if (this.props.isExistingAssignment) {
      return this.renderContinueMainAssignmentPopup();
    }

    return this.renderStartMainAssignmentPopup();
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.mainAssignmentWrapper}>
          {this.props.showMainAssignmentPopup ?
            this.renderMainAssignmentPopup()
            : null
          }
          <button
            className={`${elements.button} ${styles.mainAssignmentButton}`}
            onClick={(e) => {
              e.stopPropagation();
              this.props.signals.techTree.mainAssignmentButtonClicked();
            }}>
            Hovedoppgave
          </button>
        </div>
        <div className={styles.tiersWrapper}>
          {this.props.tiers ? this.renderTiers() : null}
          {this.renderAddNewTier()}
        </div>
      </div>
    );
  }
}

export default Tiers;
