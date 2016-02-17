import set from 'cerebral-addons/set';
import nextCourseStep from '../actions/nextCourseStep';
import playClicked from './playClicked';
import techTreeToggled from '../../techTree/signals/toggled';
import redirectToScene from '../actions/redirectToScene';

export default [
  nextCourseStep, {
    course: [
      ...techTreeToggled
    ],
    scene: [
      set('state:/course.currentAssignmentStatus.result', false),
      redirectToScene
    ],
    assignment: [
      set('state:/course.currentAssignmentStatus.result', false),
      ...playClicked
    ]
  }
];
