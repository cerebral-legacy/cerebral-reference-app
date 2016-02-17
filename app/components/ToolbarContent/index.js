import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import ToolbarButtonPopover from 'common/components/ToolbarButtonPopover';
import ToolbarTitle from 'common/components/ToolbarTitle';
import Descriptions from '../Descriptions';
import AddNewCourse from 'components/AddNewCourse';
import icons from 'common/icons.css';
import styles from './styles.css';

@Cerebral({
  showNewCourse: 'courses.showNewCourse',
  showDescriptions: 'courses.showDescriptions'
})
class ToolbarContent extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <ToolbarTitle title="Kurs"/>
        <ToolbarButtonPopover
          icon={icons.addFile}
          onClick={() => this.props.signals.courses.newCourseClicked()}
          show={this.props.showNewCourse}>
          <AddNewCourse/>
        </ToolbarButtonPopover>
        <ToolbarButtonPopover
          icon={icons.addAssignment}
          onClick={() => this.props.signals.courses.showDescriptionsClicked()}
          show={this.props.showDescriptions}>
          <Descriptions/>
        </ToolbarButtonPopover>
      </div>
    );
  }
}

export default ToolbarContent;
