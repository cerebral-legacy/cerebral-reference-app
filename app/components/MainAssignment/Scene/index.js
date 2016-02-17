import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Module from 'components/Module';
import ToolbarButton from 'common/components/ToolbarButton';
import Toolbar from 'common/components/Toolbar';
import CodeEditor from 'components/CodeEditor';
import Preview from 'components/Preview';
import icons from 'common/icons.css';
import styles from 'components/Scene/styles.css';
import isAdminMode from 'modules/course/computed/isAdminMode';
import DescriptionsList from '../DescriptionsList';
import AddFile from 'components/AddFile';
import ModuleFiles from 'components/ModuleFiles';
import classNames from 'classnames';

import currentScene from 'modules/course/computed/currentScene';
import currentFile from 'modules/course/computed/currentFile';

@Cerebral({
  isLoading: 'course.isLoading',
  isRecording: 'recorder.isRecording',
  recorder: 'recorder',
  user: 'user',
  courseName: 'course.name',
  courseId: 'course.id',
  tierCourses: 'course.tierCourses',
  isAdminMode: isAdminMode,
  currentScene: currentScene,
  currentFile: currentFile,
  showScenesList: 'course.showScenesList',
  showAddFileInput: 'course.showAddFileInput',
  newFileName: 'course.newFileName',
  scenesList: 'course.scenesList',
  mainAssignment: 'mainAssignment',
  showConfigureScenes: 'course.showConfigureScenes'
})
class Scene extends React.Component {
  assignmentDescriptionChanged(e) {
    this.props.signals.course.assignmentDescriptionChanged.sync({
      description: e.target.value
    });
  }
  render() {
    const preview = this.props.mainAssignment.preview;

    return (
      <div className={styles.modules}>
        <Module className={this.props.isAdminMode ? styles.controlsAndAssignmentsAdmin : styles.controlsAndAssignments} show>
          <Toolbar>
            <ToolbarButton icon={icons.chevronLeft} title="Kursoversikt" onClick={() => this.props.signals.techTree.toggled()}/>
          </Toolbar>
          <DescriptionsList/>
        </Module>
        <Module className={styles.code} show>
          <div className={styles.section}>
            <Toolbar>
              <div className={classNames(styles.codeEditorToolbarWrapper, {
                [styles.hidden]: preview
              })}>
                <ModuleFiles
                  scene={this.props.currentScene}
                  currentFile={this.props.currentFile}
                  onFileClick={this.props.signals.course.fileClicked}/>
                <AddFile
                  onAddFileClick={this.props.signals.course.addFileClicked}
                  onFileNameChange={this.props.signals.course.addFileNameUpdated}
                  onFileSubmit={this.props.signals.course.addFileSubmitted}
                  onAddFileAborted={this.props.signals.course.addFileAborted}
                  showInput={this.props.showAddFileInput}
                  placeholder="Filnavn..."
                  value={this.props.newFileName}/>
              </div>
            </Toolbar>
            <CodeEditor sandboxMode/>
          </div>
          <div className={styles.section}>
            <Toolbar>
              <span className={styles.toolbarButtonRight}>
                <ToolbarButton
                  active={preview}
                  icon={icons.eye}
                  onClick={() => this.props.signals.mainAssignment.opened({
                    userId: this.props.mainAssignment.userId,
                    preview: preview ? false : true
                  })}/>
              </span>
            </Toolbar>
            <Preview show={this.props.showPreview} fullSize={preview}/>
          </div>
        </Module>
      </div>
    );
  }
}

export default Scene;
