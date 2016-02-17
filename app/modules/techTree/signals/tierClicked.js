import setSelectedTierIndex from '../actions/setSelectedTierIndex';
import createDependencySlotTree from '../actions/createDependencySlotTree';
import getCoursesInSelectedTier from '../actions/getCoursesInSelectedTier';
import showSnackbar from 'common/factories/actions/showSnackbar';
import updateCourses from '../actions/updateCourses';
import setTierCoursesLoaded from '../actions/setTierCoursesLoaded';
import tierCoursesAreLoaded from '../actions/tierCoursesAreLoaded';

export default [
  tierCoursesAreLoaded, {
    true: [
      setSelectedTierIndex,
      createDependencySlotTree
    ],
    false: [
      getCoursesInSelectedTier, {
        success: [
          updateCourses,
          setTierCoursesLoaded,
          setSelectedTierIndex,
          createDependencySlotTree
        ],
        error: [showSnackbar('Det oppstod en feil ved henting av kurs!')]
      }
    ]
  }
];
