import set from 'cerebral-addons/set';
import when from 'cerebral-addons/when';
import getCourse from './../actions/getCourse.js';
import getScene from './../actions/getScene.js';
import setCourse from './../actions/setCourse.js';
import setDefaultCourseState from './../actions/setDefaultCourseState.js';
import isSameCourse from './../actions/isSameCourse.js';
import courseAndSceneDidLoad from './../actions/courseAndSceneDidLoad.js';
import setScene from './../actions/setScene.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import saveSandboxChain from './../chains/saveSandbox.js';
import setLoadedCourseSnackbar from './../actions/setLoadedCourseSnackbar';
import setAssignmentsPositions from './../actions/setAssignmentsPositions';
import getAndSetDescriptions from 'modules/descriptions/chains/getAndSetDescriptions';
import getTechTree from 'modules/techTree/chains/getTechTree';

export default [
  set('state:/currentPage', 'course'),
  set('state:/course.currentAssignmentStatus.result', false),
  isSameCourse, {
    true: [
      showSnackbar('Laster scene...'),
      set('state:/course.showScenesList', false),
      getScene,
      when('input:/scene'), {
        isTrue: [
          setScene,
          setAssignmentsPositions,
          set('state:/course.currentAssignmentIndex', -1),
          ...saveSandboxChain,
          showSnackbar('Scenen er lastet')
        ],
        isFalse: [
          showSnackbar('Innlasting av scenen feilet!')
        ]
      }
    ],
    false: [
      setDefaultCourseState,
      showSnackbar('Laster kurs...'),
      set('state:/course.isLoading', true),
      [
        getCourse,
        getScene
      ],
      courseAndSceneDidLoad, {
        true: [
          setCourse,
          setScene,
          setAssignmentsPositions,
          set('state:/course.currentAssignmentIndex', -1),
          ...saveSandboxChain,
          setLoadedCourseSnackbar,
          set('state:/course.isLoading', false)
        ],
        false: [
          showSnackbar('Innlasting av kurset feilet!')
        ]
      }
    ]
  },
  ...getAndSetDescriptions,
  ...getTechTree,
  set('state:/techTree.opened', false)
];
