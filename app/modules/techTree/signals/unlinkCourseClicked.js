import unlinkCourse from '../actions/unlinkCourse';
import createDependencySlotTree from '../actions/createDependencySlotTree';
import updateTier from '../actions/updateTier';
import showSnackbar from 'common/factories/actions/showSnackbar';
import updateCourses from '../actions/updateCourses';

export default [
  unlinkCourse,
  updateTier, {
    success: [
      updateCourses,
      createDependencySlotTree,
      showSnackbar('Course was successfully removed from tier')
    ],
    error: [showSnackbar('Removing of course from tier failed!')]
  }
];
