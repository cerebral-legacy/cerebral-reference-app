import when from 'cerebral-addons/when';
import copy from 'cerebral-addons/copy';
import linkCourses from '../actions/linkCourses';
import createDependencySlotTree from '../actions/createDependencySlotTree';
import showSnackbar from 'common/factories/actions/showSnackbar';
import updateTier from '../actions/updateTier';
import updateCourses from '../actions/updateCourses';
import setOpenedCoursePopup from '../actions/setOpenedCoursePopup';

export default [
  when('state:/user.isAdmin'), {
    isTrue: [
      when('state:/techTree.selectedCourse'), {
        isTrue: [
          linkCourses,
          updateTier, {
            success: [
              updateCourses,
              createDependencySlotTree
            ],
            error: [showSnackbar('Oppdatering av tier feilet!')]
          }
        ],
        isFalse: [copy('input:/course', 'state:/techTree.selectedCourse')]
      }
    ],
    isFalse: [
      setOpenedCoursePopup
    ]
  }
];
