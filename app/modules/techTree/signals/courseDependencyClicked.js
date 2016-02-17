import addCourseDependency from '../actions/addCourseDependency';
import createDependencySlotTree from '../actions/createDependencySlotTree';
import showSnackbar from 'common/factories/actions/showSnackbar';
import updateTier from '../actions/updateTier';
import updateCourses from '../actions/updateCourses';

export default [
  addCourseDependency,
  updateTier, {
    success: [
      updateCourses,
      createDependencySlotTree
    ],
    error: [
      showSnackbar('Oppdatering av tier feilet!')
    ]
  }
];
