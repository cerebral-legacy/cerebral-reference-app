import copy from 'cerebral-addons/copy';

export default [
  copy('input:/tooltip', 'state:/course.tooltip.visible'),
  copy('input:/timeout', 'state:/course.tooltip.timeout')
];
